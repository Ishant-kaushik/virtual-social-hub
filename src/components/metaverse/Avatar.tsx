import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

interface AvatarProps {
  color?: string;
  isLocal?: boolean;
}

const Avatar = ({ color = "#00D9FF", isLocal = false }: AvatarProps) => {
  const bodyRef = useRef<Mesh>(null);
  const headRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (isLocal && headRef.current) {
      // Subtle floating animation for local avatar
      headRef.current.position.y = 1.3 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  return (
    <group>
      {/* Body */}
      <mesh ref={bodyRef} position={[0, 0.5, 0]} castShadow>
        <capsuleGeometry args={[0.3, 0.6, 8, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* Head */}
      <mesh ref={headRef} position={[0, 1.3, 0]} castShadow>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          metalness={0.4}
          roughness={0.6}
        />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.08, 1.35, 0.2]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.08, 1.35, 0.2]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Glow effect */}
      <pointLight position={[0, 1, 0]} intensity={0.5} distance={2} color={color} />
    </group>
  );
};

export default Avatar;
