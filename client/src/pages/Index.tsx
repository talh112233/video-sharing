import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import type { Video } from "@shared/schema";

export default function Index() {
  const { data, isLoading, error } = useQuery<{ videos: Video[] }>({
    queryKey: ["/api/videos"],
  });

  const videos = data?.videos || [];

  return (
    <div className="min-h-screen gradient-dark">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 
            className="text-4xl sm:text-5xl font-bold text-foreground mb-2 tracking-tight"
            data-testid="text-page-title"
          >
            Trending Videos
          </h1>
          <p className="text-lg text-muted-foreground" data-testid="text-page-subtitle">
            Discover what's popular right now
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-[9/16] w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 animate-fade-in">
            <p className="text-xl text-destructive mb-4" data-testid="text-error">
              Failed to load videos. Please try again later.
            </p>
          </div>
        ) : videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
            {videos.map((video) => (
              <VideoCard 
                key={video.id} 
                id={video.id}
                title={video.title}
                thumbnail={video.thumbnail}
                videoUrl={video.videoUrl}
                views={video.views}
                createdAt={video.createdAt.toString()}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 animate-fade-in">
            <p className="text-xl text-muted-foreground mb-4" data-testid="text-empty">
              No videos yet. Be the first to upload!
            </p>
            <Link href="/upload">
              <Button className="shadow-glow" data-testid="button-upload-first">
                <Upload className="h-4 w-4 mr-2" />
                Upload Your First Video
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
