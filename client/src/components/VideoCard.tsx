import { useState } from "react";
import { Eye, Calendar, Play } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  views: number;
  createdAt: string;
}

export default function VideoCard({ id, title, thumbnail, videoUrl, views, createdAt }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formattedDate = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  const formattedViews = views >= 1000 ? `${(views / 1000).toFixed(1)}K` : views.toString();

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div 
      className="group relative overflow-hidden rounded-lg bg-card border border-card-border shadow-card transition-smooth"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`card-video-${id}`}
    >
      <div className="relative aspect-[9/16] w-full overflow-hidden">
        {isPlaying ? (
          <video
            src={videoUrl}
            className="h-full w-full object-cover"
            controls
            autoPlay
            data-testid={`video-player-${id}`}
          />
        ) : (
          <>
            <img
              src={thumbnail}
              alt={title}
              className="h-full w-full object-cover transition-smooth group-hover:scale-105"
              data-testid={`img-thumbnail-${id}`}
            />
            <div 
              className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-smooth ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <button
                onClick={handlePlay}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-glow transition-smooth hover:scale-110"
                data-testid={`button-play-${id}`}
              >
                <Play className="h-8 w-8 text-primary-foreground ml-1" />
              </button>
            </div>
          </>
        )}
      </div>

      <div className="p-4 space-y-2">
        <h3 
          className="font-semibold text-foreground line-clamp-2 leading-tight"
          data-testid={`text-title-${id}`}
        >
          {title}
        </h3>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1" data-testid={`text-views-${id}`}>
            <Eye className="h-4 w-4" />
            {formattedViews} views
          </span>
          <span className="flex items-center gap-1" data-testid={`text-date-${id}`}>
            <Calendar className="h-4 w-4" />
            {formattedDate}
          </span>
        </div>
      </div>
    </div>
  );
}
