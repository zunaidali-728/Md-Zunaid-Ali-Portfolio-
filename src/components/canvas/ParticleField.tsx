import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScroll, useVelocity } from 'framer-motion';

export const ParticleField = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Create 3000 particles
  const count = 3000;
  const { positions, randomFactors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const factors = new Float32Array(count);
    for (let i = 0; i < count; i++) {
        // random position in a 60x60x30 box
        pos[i * 3] = (Math.random() - 0.5) * 60; // x
        pos[i * 3 + 1] = (Math.random() - 0.5) * 60; // y
        pos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 15; // z
        factors[i] = Math.random();
    }
    return { positions: pos, randomFactors: factors };
  }, [count]);

  const { scrollY } = useScroll();
  const scrollYVelocity = useVelocity(scrollY);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    // Mouse parallax
    const mouseX = (state.pointer.x * Math.PI) / 8; // max ±8deg (approx 22deg actually, but subtle enough)
    const mouseY = (state.pointer.y * Math.PI) / 8;
    
    // Lerp rotation for smooth mouse tracking
    pointsRef.current.rotation.x += (mouseY - pointsRef.current.rotation.x) * 0.05;
    pointsRef.current.rotation.y += (mouseX - pointsRef.current.rotation.y) * 0.05;

    // Scroll drifting
    const scrollVel = scrollYVelocity.get() || 0;
    const time = state.clock.getElapsedTime();

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      // y += scrollVelocity * 0.003
      positions[i * 3 + 1] += scrollVel * 0.003;
      
      // Idle sine wave oscillation on x-axis
      positions[i * 3] += Math.sin(time + randomFactors[i] * Math.PI * 2) * 0.002;
      
      // Wrap around logic (60x60 box)
      if (positions[i * 3 + 1] > 30) positions[i * 3 + 1] = -30;
      if (positions[i * 3 + 1] < -30) positions[i * 3 + 1] = 30;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={1.2}
        sizeAttenuation={false}
        color="#C8A96E"
        transparent
        opacity={0.8}
      />
    </points>
  );
};
