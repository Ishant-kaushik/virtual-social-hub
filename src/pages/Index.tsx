import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Users, Video, Map } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-space relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 bg-gradient-glow animate-pulse opacity-30" />
      <div className="absolute top-20 left-20 w-64 h-64 bg-cyber-glow/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-holo-teal/10 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero section */}
        <div className="text-center mb-16 pt-12">
          <div className="inline-block mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-cyber blur-xl opacity-50" />
              <h1 className="relative text-7xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
                Metaverse
              </h1>
            </div>
          </div>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Enter a 3D multiplayer world where proximity brings people together.
            Explore immersive scenes and connect instantly through video calls.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/auth")}
              className="bg-gradient-cyber hover:opacity-90 transition-all hover:shadow-glow"
            >
              <Sparkles className="mr-2 w-5 h-5" />
              Enter Metaverse
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/auth")}
              className="border-primary/50 hover:bg-primary/10"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="bg-card/50 backdrop-blur-xl border-border/50 p-6 hover:shadow-glow transition-all">
            <div className="w-12 h-12 bg-gradient-cyber rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Real-time Multiplayer</h3>
            <p className="text-sm text-muted-foreground">
              See other users in real-time as they explore the same spaces. Your avatars move together in the 3D world.
            </p>
          </Card>

          <Card className="bg-card/50 backdrop-blur-xl border-border/50 p-6 hover:shadow-glow transition-all">
            <div className="w-12 h-12 bg-gradient-cyber rounded-lg flex items-center justify-center mb-4">
              <Video className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Proximity Video Calls</h3>
            <p className="text-sm text-muted-foreground">
              Get close to another user and a video call automatically starts. Distance-based communication.
            </p>
          </Card>

          <Card className="bg-card/50 backdrop-blur-xl border-border/50 p-6 hover:shadow-glow transition-all">
            <div className="w-12 h-12 bg-gradient-cyber rounded-lg flex items-center justify-center mb-4">
              <Map className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Multiple Scenes</h3>
            <p className="text-sm text-muted-foreground">
              Explore different environments - from classrooms to hack houses. Each scene offers unique experiences.
            </p>
          </Card>
        </div>

        {/* CTA section */}
        <div className="text-center">
          <Card className="bg-card/50 backdrop-blur-xl border-border/50 p-12 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to explore?
            </h2>
            <p className="text-muted-foreground mb-6">
              Create your avatar and start meeting people in the metaverse today.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/auth")}
              className="bg-gradient-cyber hover:opacity-90 transition-all hover:shadow-glow"
            >
              Get Started Now
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
