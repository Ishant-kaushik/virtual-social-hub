import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogOut, Users, Video } from "lucide-react";

interface MetaverseUIProps {
  user: User;
  onLogout: () => void;
}

const MetaverseUI = ({ user, onLogout }: MetaverseUIProps) => {
  return (
    <>
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
        <Card className="bg-card/80 backdrop-blur-xl border-border/50 px-4 py-2">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm text-foreground">Classroom Scene</span>
          </div>
        </Card>

        <Card className="bg-card/80 backdrop-blur-xl border-border/50 px-4 py-2">
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="hover:bg-destructive/20"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <Card className="bg-card/80 backdrop-blur-xl border-border/50 p-4">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-2">Controls</p>
              <div className="flex gap-2">
                <div className="bg-muted/50 px-3 py-1 rounded text-xs">WASD</div>
                <div className="bg-muted/50 px-3 py-1 rounded text-xs">Move</div>
              </div>
            </div>
            
            <div className="h-8 w-px bg-border" />
            
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-muted/50 hover:bg-primary/20"
            >
              <Users className="w-4 h-4" />
              <span className="text-xs">Players</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-muted/50 hover:bg-primary/20"
            >
              <Video className="w-4 h-4" />
              <span className="text-xs">Video Call (Coming Soon)</span>
            </Button>
          </div>
        </Card>
      </div>

      {/* Instructions overlay */}
      <div className="absolute top-20 left-4 z-10">
        <Card className="bg-card/80 backdrop-blur-xl border-border/50 p-4 max-w-xs">
          <h3 className="text-sm font-semibold text-foreground mb-2">Welcome to the Metaverse!</h3>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Use WASD or arrow keys to move</li>
            <li>• A/D to rotate your avatar</li>
            <li>• Get close to others to trigger video calls</li>
            <li>• Explore the classroom environment</li>
          </ul>
        </Card>
      </div>
    </>
  );
};

export default MetaverseUI;
