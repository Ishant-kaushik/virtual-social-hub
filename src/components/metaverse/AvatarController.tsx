import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { supabase } from "@/integrations/supabase/client";
import Avatar from "./Avatar";

interface AvatarControllerProps {
  userId: string;
  sceneId: string;
}

const AvatarController = ({ userId, sceneId }: AvatarControllerProps) => {
  const avatarRef = useRef<any>(null);
  const { camera } = useThree();
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const velocity = useRef(new Vector3());
  const direction = useRef(new Vector3());
  const lastUpdateTime = useRef(Date.now());

  const moveSpeed = 0.1;
  const rotationSpeed = 0.05;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    // Initialize presence
    const initPresence = async () => {
      await supabase.from("user_presence").upsert({
        user_id: userId,
        scene_id: sceneId,
        position_x: 0,
        position_y: 0,
        position_z: 5,
        rotation_y: 0,
        last_updated: new Date().toISOString(),
      });
    };

    initPresence();

    // Cleanup on unmount
    return () => {
      supabase.from("user_presence").delete().match({
        user_id: userId,
        scene_id: sceneId,
      });
    };
  }, [userId, sceneId]);

  useFrame(() => {
    if (!avatarRef.current) return;

    const keys = keysPressed.current;
    let moved = false;

    // Reset direction
    direction.current.set(0, 0, 0);

    // WASD movement
    if (keys["w"] || keys["arrowup"]) {
      direction.current.z -= 1;
      moved = true;
    }
    if (keys["s"] || keys["arrowdown"]) {
      direction.current.z += 1;
      moved = true;
    }
    if (keys["a"] || keys["arrowleft"]) {
      avatarRef.current.rotation.y += rotationSpeed;
      moved = true;
    }
    if (keys["d"] || keys["arrowright"]) {
      avatarRef.current.rotation.y -= rotationSpeed;
      moved = true;
    }

    // Apply movement
    if (direction.current.length() > 0) {
      direction.current.normalize();
      
      // Rotate direction based on avatar rotation
      const rotatedDirection = direction.current.clone();
      rotatedDirection.applyAxisAngle(new Vector3(0, 1, 0), avatarRef.current.rotation.y);
      
      velocity.current.copy(rotatedDirection.multiplyScalar(moveSpeed));
      avatarRef.current.position.add(velocity.current);

      // Boundary limits
      avatarRef.current.position.x = Math.max(-14, Math.min(14, avatarRef.current.position.x));
      avatarRef.current.position.z = Math.max(-14, Math.min(14, avatarRef.current.position.z));
    }

    // Update camera to follow avatar
    const cameraOffset = new Vector3(0, 5, 10);
    cameraOffset.applyAxisAngle(new Vector3(0, 1, 0), avatarRef.current.rotation.y);
    camera.position.lerp(avatarRef.current.position.clone().add(cameraOffset), 0.1);
    camera.lookAt(avatarRef.current.position);

    // Update position in database every 100ms
    const now = Date.now();
    if (moved && now - lastUpdateTime.current > 100) {
      lastUpdateTime.current = now;
      
      supabase.from("user_presence").upsert({
        user_id: userId,
        scene_id: sceneId,
        position_x: avatarRef.current.position.x,
        position_y: avatarRef.current.position.y,
        position_z: avatarRef.current.position.z,
        rotation_y: avatarRef.current.rotation.y,
        last_updated: new Date().toISOString(),
      });
    }
  });

  return (
    <group ref={avatarRef} position={[0, 0, 5]}>
      <Avatar color="#00D9FF" isLocal />
    </group>
  );
};

export default AvatarController;
