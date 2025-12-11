import Header from "@/components/Header";
import VideoUploadForm from "@/components/VideoUploadForm";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Sun, Sparkles } from "lucide-react";

export default function Upload() {
  return (
    <div className="min-h-screen gradient-dark">
      <Header />

      <main className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
          <div className="text-center space-y-2">
            <h1 
              className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight"
              data-testid="text-page-title"
            >
              Upload Your Video
            </h1>
            <p className="text-lg text-muted-foreground" data-testid="text-page-subtitle">
              Share your moments with the world
            </p>
          </div>

          <VideoUploadForm />

          <div className="text-center space-y-4 pt-10">
            <h2 className="text-xl font-semibold text-foreground" data-testid="text-tips-title">
              Tips for great uploads
            </h2>

            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <Card className="border-border shadow-card">
                <CardContent className="p-4 text-center">
                  <div className="flex justify-center mb-2">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <p className="font-medium text-primary mb-1" data-testid="text-tip-1-title">Keep it short</p>
                  <p className="text-muted-foreground" data-testid="text-tip-1-desc">
                    15-60 seconds works best
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border shadow-card">
                <CardContent className="p-4 text-center">
                  <div className="flex justify-center mb-2">
                    <Sun className="h-5 w-5 text-primary" />
                  </div>
                  <p className="font-medium text-primary mb-1" data-testid="text-tip-2-title">Good lighting</p>
                  <p className="text-muted-foreground" data-testid="text-tip-2-desc">
                    Natural light is your friend
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border shadow-card">
                <CardContent className="p-4 text-center">
                  <div className="flex justify-center mb-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <p className="font-medium text-primary mb-1" data-testid="text-tip-3-title">Catchy title</p>
                  <p className="text-muted-foreground" data-testid="text-tip-3-desc">
                    Make people want to watch
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
