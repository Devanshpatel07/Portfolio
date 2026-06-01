import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, ContactShadows, Environment } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import Model3D from "./Model3D";
import { useScroll, useTransform } from "motion/react";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const { scrollYProgress } = useScroll();
  const isMobile = useIsMobile();

  // Create rotation based on scroll
  const rotationY = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2]);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation combined with scroll rotation
      groupRef.current.rotation.y = rotationY.get() + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <>
      <PerspectiveCamera 
        makeDefault 
        position={[0, 0.5, isMobile ? 8 : 6]} 
        fov={isMobile ? 50 : 45} 
      />
      <Environment preset="city" />
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      
      <Suspense fallback={null}>
        <group ref={groupRef}>
          <Model3D isMobile={isMobile} />
        </group>
      </Suspense>

      <ContactShadows 
        position={[0, -2, 0]} 
        opacity={0.4} 
        scale={10} 
        blur={2.5} 
        far={4.5} 
      />
    </>
  );
}

export default function Experience() {
  return (
    <div className="absolute inset-0 z-0 opacity-80">
      <Canvas shadows>
        <Scene />
      </Canvas>
    </div>
  );
}
