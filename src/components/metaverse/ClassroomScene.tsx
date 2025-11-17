import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Sky } from "@react-three/drei";
import { Suspense } from "react";
import Classroom from "./Classroom";
import AvatarController from "./AvatarController";
import MultiplayerAvatars from "./MultiplayerAvatars";

interface ClassroomSceneProps {
  userId: string;
}

const ClassroomScene = ({ userId }: ClassroomSceneProps) => {
  return (
    <Canvas shadows className="w-full h-full">
      <Suspense fallback={null}>
        <PerspectiveCamera makeDefault position={[0, 5, 10]} fov={60} />
        
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <pointLight position={[-10, 10, -10]} intensity={0.5} color="#00D9FF" />
        
        {/* Sky */}
        <Sky sunPosition={[100, 20, 100]} />
        
        {/* Scene elements */}
        <Classroom />
        <AvatarController userId={userId} sceneId="classroom" />
        <MultiplayerAvatars currentUserId={userId} sceneId="classroom" />
        
        {/* Camera controls */}
        <OrbitControls
          enablePan={false}
          minDistance={5}
          maxDistance={20}
          maxPolarAngle={Math.PI / 2}
        />
      </Suspense>
    </Canvas>
  );
};

export default ClassroomScene;
