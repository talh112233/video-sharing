import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center gradient-dark px-6">
      <div className="text-center animate-fade-in">
        <h1 
          className="text-6xl font-extrabold text-foreground mb-4 tracking-tight"
          data-testid="text-404"
        >
          404
        </h1>
        <p 
          className="text-xl text-muted-foreground mb-8"
          data-testid="text-not-found-message"
        >
          Oops! The page you're looking for doesn't exist.
        </p>

        <Link href="/">
          <Button className="shadow-glow" data-testid="button-return-home">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
