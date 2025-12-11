import { Link, useLocation } from "wouter";
import { Play, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Play className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">VidShare</span>
            </div>
          </Link>

          <nav className="flex items-center gap-2">
            <Link href="/" data-testid="link-nav-home">
              <Button 
                variant={location === "/" ? "secondary" : "ghost"}
                size="sm"
              >
                Home
              </Button>
            </Link>
            <Link href="/upload" data-testid="link-nav-upload">
              <Button 
                variant={location === "/upload" ? "default" : "ghost"}
                size="sm"
                className={location === "/upload" ? "shadow-glow" : ""}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
