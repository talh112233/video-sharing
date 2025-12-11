import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import path from "path";
import fs from "fs";
import { insertVideoSchema } from "@shared/schema";

const uploadDir = path.join(process.cwd(), "uploads");
const thumbnailDir = path.join(uploadDir, "thumbnails");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
if (!fs.existsSync(thumbnailDir)) {
  fs.mkdirSync(thumbnailDir, { recursive: true });
}

const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: videoStorage,
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["video/mp4", "video/webm", "video/quicktime", "video/x-msvideo"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only video files are allowed."));
    }
  },
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.use("/uploads", (req, res, next) => {
    res.setHeader("Accept-Ranges", "bytes");
    next();
  }, express.static(uploadDir));

  app.get("/api/videos", async (req, res) => {
    try {
      const videos = await storage.getVideos();
      res.json({ videos });
    } catch (error) {
      console.error("Error fetching videos:", error);
      res.status(500).json({ error: "Failed to fetch videos" });
    }
  });

  app.get("/api/videos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const video = await storage.getVideo(id);
      
      if (!video) {
        return res.status(404).json({ error: "Video not found" });
      }

      await storage.incrementViews(id);
      res.json({ video });
    } catch (error) {
      console.error("Error fetching video:", error);
      res.status(500).json({ error: "Failed to fetch video" });
    }
  });

  app.post("/api/videos", upload.single("video"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No video file provided" });
      }

      const { title } = req.body;

      if (!title || typeof title !== "string" || !title.trim()) {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ error: "Title is required" });
      }

      const videoUrl = `/uploads/${req.file.filename}`;
      const thumbnail = `/uploads/${req.file.filename}`;

      const videoData = {
        title: title.trim(),
        videoUrl,
        thumbnail,
      };

      const validationResult = insertVideoSchema.safeParse(videoData);
      if (!validationResult.success) {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ error: "Invalid video data", details: validationResult.error.errors });
      }

      const video = await storage.createVideo(validationResult.data);
      res.status(201).json({ video });
    } catch (error) {
      console.error("Error uploading video:", error);
      if (req.file) {
        try {
          fs.unlinkSync(req.file.path);
        } catch (e) {
          console.error("Error cleaning up file:", e);
        }
      }
      res.status(500).json({ error: "Failed to upload video" });
    }
  });

  return httpServer;
}
