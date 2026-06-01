import { useGLTF, Float } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export default function Model3D({ isMobile }: { isMobile: boolean }) {
  const { viewport } = useThree();
  const { scene } = useGLTF("https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/RobotExpressive/RobotExpressive.glb");
  
  // Calculate scale based on viewport width
  // Mobile: width is small, scale should be smaller
  const scale = isMobile ? viewport.width * 0.12 : 0.8;
  const positionY = isMobile ? -1.5 : -2;

  return (
    <Float rotationIntensity={0.5} floatIntensity={0.5} speed={1.5}>
      <primitive 
        object={scene} 
        scale={scale} 
        rotation={[0, Math.PI / 4, 0]} 
        position={[0, positionY, 0]} 
      />
    </Float>
  );
}

useGLTF.preload("https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/RobotExpressive/RobotExpressive.glb");
