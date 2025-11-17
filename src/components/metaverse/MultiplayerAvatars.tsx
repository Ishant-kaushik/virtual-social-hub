import { useEffect, useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { supabase } from "@/integrations/supabase/client";
import Avatar from "./Avatar";
import { Html } from "@react-three/drei";

interface PlayerPresence {
  user_id: string;
  position_x: number;
  position_y: number;
  position_z: number;
  rotation_y: number;
  username?: string;
  avatar_color?: string;
}

interface MultiplayerAvatarsProps {
  currentUserId: string;
  sceneId: string;
}

const MultiplayerAvatars = ({ currentUserId, sceneId }: MultiplayerAvatarsProps) => {
  const [players, setPlayers] = useState<PlayerPresence[]>([]);
  const avatarRefs = useRef<{ [key: string]: any }>({});

  useEffect(() => {
    // Fetch initial presence
    const fetchPresence = async () => {
      const { data, error } = await supabase
        .from("user_presence")
        .select(`
          *,
          profiles(username, avatar_color)
        `)
        .eq("scene_id", sceneId)
        .neq("user_id", currentUserId);

      if (data && !error) {
        const mappedData = data.map((p: any) => ({
          ...p,
          username: p.profiles?.username,
          avatar_color: p.profiles?.avatar_color,
        }));
        setPlayers(mappedData);
      }
    };

    fetchPresence();

    // Subscribe to realtime updates
    const channel = supabase
      .channel("presence-updates")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "user_presence",
          filter: `scene_id=eq.${sceneId}`,
        },
        async (payload) => {
          if (payload.eventType === "INSERT" || payload.eventType === "UPDATE") {
            if (payload.new.user_id !== currentUserId) {
              // Fetch profile data
              const { data: profile } = await supabase
                .from("profiles")
                .select("username, avatar_color")
                .eq("id", payload.new.user_id)
                .single();

              setPlayers((prev) => {
                const filtered = prev.filter((p) => p.user_id !== payload.new.user_id);
                return [
                  ...filtered,
                  {
                    user_id: payload.new.user_id,
                    position_x: payload.new.position_x,
                    position_y: payload.new.position_y,
                    position_z: payload.new.position_z,
                    rotation_y: payload.new.rotation_y,
                    username: profile?.username,
                    avatar_color: profile?.avatar_color,
                  },
                ];
              });
            }
          } else if (payload.eventType === "DELETE") {
            setPlayers((prev) => prev.filter((p) => p.user_id !== payload.old.user_id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUserId, sceneId]);

  useFrame(() => {
    // Smooth interpolation for remote avatars
    players.forEach((player) => {
      const ref = avatarRefs.current[player.user_id];
      if (ref) {
        const targetPos = new Vector3(player.position_x, player.position_y, player.position_z);
        ref.position.lerp(targetPos, 0.1);
        
        // Smooth rotation
        const targetRotation = player.rotation_y;
        const currentRotation = ref.rotation.y;
        ref.rotation.y += (targetRotation - currentRotation) * 0.1;
      }
    });
  });

  return (
    <>
      {players.map((player) => (
        <group
          key={player.user_id}
          ref={(el) => (avatarRefs.current[player.user_id] = el)}
          position={[player.position_x, player.position_y, player.position_z]}
          rotation={[0, player.rotation_y, 0]}
        >
          <Avatar color={player.avatar_color || "#FF6B6B"} />
          
          {/* Username label */}
          <Html position={[0, 2, 0]} center distanceFactor={10}>
            <div className="bg-card/80 backdrop-blur-sm px-2 py-1 rounded-lg border border-border/50 text-xs text-foreground whitespace-nowrap">
              {player.username || "Anonymous"}
            </div>
          </Html>
        </group>
      ))}
    </>
  );
};

export default MultiplayerAvatars;
