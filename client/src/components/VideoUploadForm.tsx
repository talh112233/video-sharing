import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { Upload, Video, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function VideoUploadForm() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [title, setTitle] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("video/")) {
        toast({
          title: "Invalid file type",
          description: "Please select a video file",
          variant: "destructive",
        });
        return;
      }
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveVideo = () => {
    setVideoFile(null);
    setVideoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your video",
        variant: "destructive",
      });
      return;
    }

    if (!videoFile) {
      toast({
        title: "Video required",
        description: "Please select a video to upload",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("video", videoFile);

      const response = await fetch("/api/videos", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      toast({
        title: "Upload successful",
        description: "Your video has been uploaded",
      });

      setLocation("/");
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="border-border shadow-card">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-foreground">
              Video Title
            </Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter a catchy title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-background border-border"
              data-testid="input-title"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">Video File</Label>
            
            {videoPreview ? (
              <div className="relative aspect-[9/16] max-h-80 w-full overflow-hidden rounded-lg bg-card border border-border">
                <video
                  src={videoPreview}
                  className="h-full w-full object-contain"
                  controls
                  data-testid="video-preview"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={handleRemoveVideo}
                  data-testid="button-remove-video"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div
                className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-border bg-muted/50 p-12 cursor-pointer transition-smooth hover:border-primary hover:bg-muted"
                onClick={() => fileInputRef.current?.click()}
                data-testid="dropzone-video"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Video className="h-8 w-8 text-primary" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-foreground">Click to upload</p>
                  <p className="text-sm text-muted-foreground">MP4, WebM, or MOV (max 100MB)</p>
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleFileSelect}
              data-testid="input-video-file"
            />
          </div>

          <Button
            type="submit"
            className="w-full shadow-glow"
            disabled={isUploading || !title.trim() || !videoFile}
            data-testid="button-submit"
          >
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload Video
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
