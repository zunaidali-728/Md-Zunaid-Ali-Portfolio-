import { useMemo, useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CODE_STRINGS = [
  'const api = new RestTemplate();',
  '@SpringBootApplication',
  'SELECT id, name FROM users',
  'db.collection("items").get()',
  'viewModel.liveData.observe(this)',
  'docker build -t app:latest .',
  '@Override onCreateView()',
  'gsap.to(el, { y: 0, opacity: 1 })',
  'retrofit.create(ApiService::class)',
  '.setJdbcUrl(DB_URL)',
  'indexing: ON  query_time: 12ms',
  'POST /api/v1/users HTTP 201',
];

export const CodeFragments = ({ scrollProgress, mouse }: any) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fragments = useMemo(() => {
    return CODE_STRINGS.map((codeString) => {
      // Create texture
      const canvas = document.createElement('canvas');
      canvas.width = 320;
      canvas.height = 64;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = 'transparent';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = '13px "DM Mono", monospace';
      ctx.fillStyle = 'rgba(200, 169, 110, 0.85)';
      ctx.fillText(codeString, 10, 42);
      
      const texture = new THREE.CanvasTexture(canvas);
      
      // Random generation
      return {
        texture,
        x: (Math.random() - 0.5) * 28, // (-14, 14)
        y: (Math.random() - 0.5) * 18, // (-9, 9)
        z: (Math.random() - 0.5) * 4 - 1, // (-3, 1)
        rotX: (Math.random() - 0.5) * 0.5,
        rotY: (Math.random() - 0.5) * 0.5,
        rotZ: (Math.random() - 0.5) * 0.5,
        depthFactor: 0.8 + Math.random() * 0.4
      };
    });
  }, []);

  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current || isMobile) return;
    
    // Parallax
    groupRef.current.children.forEach((mesh: any, i) => {
      const frag = fragments[i];
      
      // Slow drift up + loop
      frag.y += 0.0003;
      if (frag.y > 10) frag.y = -10;
      
      mesh.rotation.z += 0.00015;
      
      // Parallax application
      // frag.depthFactor varies slightly, scrollProgress * 1.4 configures fast front-layer feel
      mesh.position.y = frag.y + (scrollProgress * 1.4 * frag.depthFactor * 10);
      
      // Slight mouse tilt
      mesh.rotation.x += (((frag.rotX + mouse.current.y * 0.05) - mesh.rotation.x) * 0.02);
      mesh.rotation.y += (((frag.rotY + mouse.current.x * 0.05) - mesh.rotation.y) * 0.02);
    });
  });

  if (isMobile) return null;

  return (
    <group ref={groupRef}>
      {fragments.map((frag, i) => (
        <mesh 
          key={i} 
          position={[frag.x, frag.y, frag.z]} 
          rotation={[frag.rotX, frag.rotY, frag.rotZ]}
        >
          <planeGeometry args={[2.2, 0.45]} />
          <meshBasicMaterial 
            map={frag.texture} 
            transparent 
            opacity={0.18} 
            side={THREE.DoubleSide} 
          />
        </mesh>
      ))}
    </group>
  );
};
