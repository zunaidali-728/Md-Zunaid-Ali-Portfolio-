import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScroll } from 'framer-motion';

export const GridPlane = () => {
  const gridRef = useRef<THREE.GridHelper>(null);
  const { scrollYProgress } = useScroll();

  useFrame(() => {
    if (!gridRef.current) return;
    
    // On scroll: grid appears to move forward (translate z slightly)
    // Cinematic fly-through feel
    const scrollP = scrollYProgress.get();
    // Grid size is 50, so we move it forward slowly
    gridRef.current.position.z = scrollP * 15;
  });

  return (
    <group position={[0, -5, -10]} rotation={[0, 0, 0]}>
      {/* 50x50 segments, gold color at 4% opacity */}
      <gridHelper 
        ref={gridRef}
        args={[50, 50, '#C8A96E', '#C8A96E']} 
      />
      {/* We need to set opacity directly on the material since GridHelper args don't support opacity */}
      <mesh>
         <meshBasicMaterial attach="material" transparent opacity={0.04} />
      </mesh>
    </group>
  );
};
