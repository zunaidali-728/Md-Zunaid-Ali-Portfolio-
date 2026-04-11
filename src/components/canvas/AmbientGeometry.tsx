import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SHAPES = [
  // 1: Icosahedron wireframe
  {
    type: 'icosahedron', args: [1.4, 1], wireframe: true, opacity: 0.06, 
    position: [-10, 4, -4], rotationSpeed: [0.0008, 0.0012, 0.0004], parallaxFactor: 0.4
  },
  // 2: Icosahedron wireframe
  {
    type: 'icosahedron', args: [0.9, 0], wireframe: true, opacity: 0.07, 
    position: [11, -3, -2], rotationSpeed: [0.001, 0.0006, 0.0009], parallaxFactor: 0.5
  },
  // 3: TorusKnot wireframe
  {
    type: 'torusKnot', args: [0.7, 0.12, 64, 8], wireframe: true, opacity: 0.04, 
    position: [0, -6, -5], rotationSpeed: [0.0005, 0.001, 0.0003], parallaxFactor: 0.4
  },
  // 4: Ring flat
  {
    type: 'ring', args: [1.2, 1.4, 48], wireframe: false, opacity: 0.05, 
    position: [-12, -2, -3], rotationSpeed: [0.002, 0.0004, 0.001], parallaxFactor: 0.35
  },
  // 5: Ring flat
  {
    type: 'ring', args: [0.8, 0.95, 32], wireframe: false, opacity: 0.05, 
    position: [9, 5, -4], rotationSpeed: [0.0015, 0.002, 0.0008], parallaxFactor: 0.35
  }
];

export const AmbientGeometry = ({ scrollProgress, mouse, scrollVelocity }: any) => {
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(() => {
    const speedMultiplier = scrollVelocity > 0.01 ? 1.0 : 0.2;

    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const def = SHAPES[i];
      
      // Idle Rotation
      mesh.rotation.x += def.rotationSpeed[0] * speedMultiplier;
      mesh.rotation.y += def.rotationSpeed[1] * speedMultiplier;
      mesh.rotation.z += def.rotationSpeed[2] * speedMultiplier;
      
      // Parallax upward drift
      mesh.position.y = def.position[1] + (scrollProgress * def.parallaxFactor * 8);

      // Mouse Parallax Effect (each shape tilts uniquely ±5deg)
      mesh.rotation.x += (((mouse.current.y * 0.08) - mesh.rotation.x) * 0.02);
      mesh.rotation.y += (((mouse.current.x * 0.08) - mesh.rotation.y) * 0.02);
    });
  });

  return (
    <>
      {SHAPES.map((def, i) => {
        let GeometryComp: any;
        if (def.type === 'icosahedron') GeometryComp = <icosahedronGeometry args={def.args as any} />;
        if (def.type === 'torusKnot') GeometryComp = <torusKnotGeometry args={def.args as any} />;
        if (def.type === 'ring') GeometryComp = <ringGeometry args={def.args as any} />;

        return (
          <mesh 
            key={i}
            ref={(el) => { if(el) meshRefs.current[i] = el; }}
            position={def.position as any}
          >
            {GeometryComp}
            <meshBasicMaterial 
              color="#C8A96E"
              wireframe={def.wireframe}
              transparent
              opacity={def.opacity}
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}
    </>
  );
};
