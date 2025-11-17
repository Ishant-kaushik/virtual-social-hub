import { useRef } from "react";
import { Mesh } from "three";

const Classroom = () => {
  const floorRef = useRef<Mesh>(null);

  return (
    <group>
      {/* Floor */}
      <mesh
        ref={floorRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>

      {/* Grid pattern on floor */}
      <gridHelper args={[30, 30, "#00D9FF", "#0a0e27"]} position={[0, 0.01, 0]} />

      {/* Walls */}
      {/* Back wall */}
      <mesh position={[0, 2.5, -15]} castShadow>
        <boxGeometry args={[30, 5, 0.5]} />
        <meshStandardMaterial color="#0f1419" />
      </mesh>

      {/* Left wall */}
      <mesh position={[-15, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <boxGeometry args={[30, 5, 0.5]} />
        <meshStandardMaterial color="#0f1419" />
      </mesh>

      {/* Right wall */}
      <mesh position={[15, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <boxGeometry args={[30, 5, 0.5]} />
        <meshStandardMaterial color="#0f1419" />
      </mesh>

      {/* Desks */}
      {Array.from({ length: 12 }).map((_, i) => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        const x = (col - 1) * 4;
        const z = (row - 1.5) * 4;

        return (
          <group key={i} position={[x, 0, z]}>
            {/* Desk */}
            <mesh position={[0, 0.75, 0]} castShadow>
              <boxGeometry args={[2, 0.1, 1.5]} />
              <meshStandardMaterial color="#2a2a3e" />
            </mesh>
            {/* Desk legs */}
            {[
              [-0.9, -0.4, -0.6],
              [0.9, -0.4, -0.6],
              [-0.9, -0.4, 0.6],
              [0.9, -0.4, 0.6],
            ].map((pos, j) => (
              <mesh key={j} position={pos as [number, number, number]} castShadow>
                <cylinderGeometry args={[0.05, 0.05, 0.7]} />
                <meshStandardMaterial color="#1a1a2e" />
              </mesh>
            ))}
          </group>
        );
      })}

      {/* Teacher's desk */}
      <group position={[0, 0, -10]}>
        <mesh position={[0, 0.75, 0]} castShadow>
          <boxGeometry args={[4, 0.15, 2]} />
          <meshStandardMaterial color="#3a3a4e" />
        </mesh>
      </group>

      {/* Whiteboard */}
      <mesh position={[0, 3, -14.7]} castShadow>
        <boxGeometry args={[8, 3, 0.1]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      {/* Ceiling lights */}
      {Array.from({ length: 6 }).map((_, i) => {
        const x = (i % 2 - 0.5) * 8;
        const z = (Math.floor(i / 2) - 1) * 8;
        return (
          <group key={i} position={[x, 4.8, z]}>
            <mesh>
              <boxGeometry args={[2, 0.1, 1]} />
              <meshStandardMaterial color="#00D9FF" emissive="#00D9FF" emissiveIntensity={0.5} />
            </mesh>
            <pointLight intensity={0.3} distance={10} color="#00D9FF" />
          </group>
        );
      })}
    </group>
  );
};

export default Classroom;
