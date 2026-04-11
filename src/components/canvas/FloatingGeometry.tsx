import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScroll } from 'framer-motion';

const Shape = ({ 
  type, 
  position, 
  scale = 1, 
  wireframe = false, 
  color = "#C8A96E", 
  opacity = 1,
  rotationSpeed = [0.002, 0.003, 0.001],
  parallaxFactor = 0.5
}: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { scrollYProgress } = useScroll();
  const initialY = position[1];

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Idle rotation
    meshRef.current.rotation.x += rotationSpeed[0];
    meshRef.current.rotation.y += rotationSpeed[1];
    meshRef.current.rotation.z += rotationSpeed[2];

    // Scroll parallax depth illusion
    const scrollP = scrollYProgress.get();
    meshRef.current.position.y = initialY + (scrollP * 20 * parallaxFactor);

    // Mouse tilt
    const targetRotX = state.pointer.y * 0.2;
    const targetRotY = state.pointer.x * 0.2;
    // We additive blend mouse tilt, but gently
    meshRef.current.rotation.x += (targetRotX - meshRef.current.rotation.x * 0.1) * 0.02;
    meshRef.current.rotation.y += (targetRotY - meshRef.current.rotation.y * 0.1) * 0.02;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {type === 'icosahedron' && <icosahedronGeometry args={[1, 0]} />}
      {type === 'torus' && <torusGeometry args={[1, 0.04, 16, 100]} />}
      {type === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
      
      <meshStandardMaterial 
        color={color}
        wireframe={wireframe}
        transparent={opacity < 1}
        opacity={opacity}
        roughness={0.4}
        metalness={0.8}
      />
    </mesh>
  );
};

export const FloatingGeometry = () => {
  return (
    <>
      {/* 2x Icosahedron (wireframe, gold) */}
      <Shape type="icosahedron" position={[-8, 6, -10]} scale={1.2} wireframe color="#C8A96E" parallaxFactor={0.8} rotationSpeed={[0.002, 0.004, 0.001]} />
      <Shape type="icosahedron" position={[10, -4, -15]} scale={0.8} wireframe color="#C8A96E" parallaxFactor={0.4} rotationSpeed={[0.005, 0.002, 0.003]} />
      
      {/* 2x Torus (wireframe, gold dim) */}
      <Shape type="torus" position={[12, 8, -20]} scale={1.5} wireframe color="#8A6F3F" parallaxFactor={0.6} rotationSpeed={[-0.002, -0.003, 0.002]} />
      <Shape type="torus" position={[-14, -8, -12]} scale={2} wireframe color="#8A6F3F" parallaxFactor={0.3} rotationSpeed={[0.003, -0.001, -0.004]} />
      
      {/* 2x Octahedron (solid, gold at 6% opacity) */}
      <Shape type="octahedron" position={[0, -10, -5]} scale={1.5} color="#C8A96E" opacity={0.06} parallaxFactor={0.5} rotationSpeed={[0.004, 0.004, 0]} />
      <Shape type="octahedron" position={[-6, 12, -22]} scale={2.5} color="#C8A96E" opacity={0.06} parallaxFactor={0.7} rotationSpeed={[-0.001, 0.005, 0.002]} />
    </>
  );
};
