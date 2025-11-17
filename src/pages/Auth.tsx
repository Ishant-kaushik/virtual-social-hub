import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        toast({
          title: "Welcome back!",
          description: "Logging you into the metaverse...",
        });
        navigate("/metaverse");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { username },
            emailRedirectTo: `${window.location.origin}/metaverse`,
          },
        });
        
        if (error) throw error;
        
        toast({
          title: "Account created!",
          description: "Entering the metaverse...",
        });
        navigate("/metaverse");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-space flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-glow animate-pulse" />
      
      <Card className="w-full max-w-md bg-card/80 backdrop-blur-xl border-border/50 shadow-glow relative z-10">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-cyber bg-clip-text text-transparent mb-2">
              Metaverse Portal
            </h1>
            <p className="text-muted-foreground">
              {isLogin ? "Enter the digital realm" : "Create your avatar"}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required={!isLogin}
                  className="bg-muted/50 border-border/50"
                  placeholder="Enter username"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-muted/50 border-border/50"
                placeholder="Enter email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="bg-muted/50 border-border/50"
                placeholder="Enter password"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-cyber hover:opacity-90 transition-opacity"
              disabled={loading}
            >
              {loading ? "Loading..." : isLogin ? "Enter Metaverse" : "Create Avatar"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:text-cyber-glow transition-colors"
            >
              {isLogin ? "Need an account? Sign up" : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Auth;
