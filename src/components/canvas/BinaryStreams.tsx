import { useMemo, useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const STREAM_COUNT = 8;
const DIGITS_PER_STREAM = 20;

export const BinaryStreams = ({ scrollProgress }: any) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { texture0, texture1 } = useMemo(() => {
    const createDigitTexture = (digit: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = 24;
      canvas.height = 36;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = 'transparent';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = 'bold 16px "DM Mono", monospace';
      ctx.fillStyle = 'rgba(200, 169, 110, 0.9)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(digit, 12, 18);
      return new THREE.CanvasTexture(canvas);
    };
    return { texture0: createDigitTexture('0'), texture1: createDigitTexture('1') };
  }, []);

  const streams = useMemo(() => {
    const arr = [];
    for (let i = 0; i < STREAM_COUNT; i++) {
        // xPos: evenly spaced from -14 to 14
        const xPos = -14 + (i * (28 / (STREAM_COUNT - 1)));
        
        const digits = [];
        for (let j = 0; j < DIGITS_PER_STREAM; j++) {
            digits.push({
                isZero: Math.random() > 0.5,
                yOffset: -j * 0.35
            });
        }
        
        arr.push({ x: xPos, z: -8, baseRotation: Math.random() > 0.5 ? 0 : Math.PI, digits, baseY: Math.random() * 8 });
    }
    return arr;
  }, []);

  const groupRefs = useRef<(THREE.Group | null)[]>([]);

  useFrame(() => {
    if (isMobile) return;
    
    groupRefs.current.forEach((group, i) => {
      if (!group) return;
      const stream = streams[i];
      
      // Moving down
      stream.baseY -= 0.004;
      if (stream.baseY < -8) stream.baseY = 8;
      
      // Depth Parallax layer A (slowest)
      group.position.y = stream.baseY + (scrollProgress * 4); // 0.5x scale roughly across 8 units
    });
  });

  if (isMobile) return null;

  return (
    <>
      {streams.map((stream, idx) => (
        <group 
          key={idx} 
          ref={(el) => { if(el) groupRefs.current[idx] = el; }}
          position={[stream.x, stream.baseY, stream.z]}
        >
          {stream.digits.map((digit, dIdx) => (
            <mesh key={dIdx} position={[0, digit.yOffset, 0]}>
              <planeGeometry args={[0.3, 0.45]} />
              <meshBasicMaterial 
                map={digit.isZero ? texture0 : texture1} 
                transparent 
                opacity={0.05} 
                side={THREE.DoubleSide}
                depthWrite={false}
              />
            </mesh>
          ))}
        </group>
      ))}
    </>
  );
};
