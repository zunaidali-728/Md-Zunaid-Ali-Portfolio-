import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const NODE_COUNT = 80;

export const NeuralNetwork = ({ scrollProgress, mouse, scrollVelocity }: any) => {
  const groupRef = useRef<THREE.Group>(null);
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);
  const lineMaterialRef = useRef<THREE.LineBasicMaterial>(null);
  
  const pulseTimer = useRef(0);
  const activeNode = useRef(-1);
  const baseColor = new THREE.Color('#C8A96E');

  const { nodes, edgePositions } = useMemo(() => {
    const nodesArr: THREE.Vector3[] = [];
    // box (-12 to 12, -7 to 7, -5 to 3)
    for (let i = 0; i < NODE_COUNT; i++) {
      nodesArr.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 24,
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 8 - 1
        )
      );
    }
    
    const edgePos: number[] = [];
    const pairs: [number, number][] = [];
    const connectionCount = new Array(NODE_COUNT).fill(0);
    
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (nodesArr[i].distanceTo(nodesArr[j]) < 4.5) {
          if (connectionCount[i] < 3 && connectionCount[j] < 3) {
            edgePos.push(
              nodesArr[i].x, nodesArr[i].y, nodesArr[i].z,
              nodesArr[j].x, nodesArr[j].y, nodesArr[j].z
            );
            pairs.push([i, j]);
            connectionCount[i]++;
            connectionCount[j]++;
          }
        }
      }
    }
    
    return { 
      nodes: nodesArr, 
      edgePositions: new Float32Array(edgePos),
      edgeNodePairs: pairs
    };
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Set initial node matrices
  useMemo(() => {
    if (!instancedMeshRef.current) return;
    nodes.forEach((pos, i) => {
      dummy.position.copy(pos);
      dummy.updateMatrix();
      instancedMeshRef.current!.setMatrixAt(i, dummy.matrix);
      // We don't use color per instance if we use material opacity, but we can set color to base
      instancedMeshRef.current!.setColorAt(i, baseColor);
    });
    instancedMeshRef.current!.instanceMatrix.needsUpdate = true;
    if (instancedMeshRef.current!.instanceColor) {
      instancedMeshRef.current!.instanceColor.needsUpdate = true;
    }
  }, [nodes, dummy, baseColor]);

  useFrame(() => {
    if (!groupRef.current) return;
    
    pulseTimer.current++;
    
    const speedMultiplier = scrollVelocity > 0.01 ? 1.0 : 0.2;
    groupRef.current.rotation.y += 0.0008 * speedMultiplier;
    
    // Mouse Parallax
    groupRef.current.rotation.x += ((mouse.current.y * 0.12) - groupRef.current.rotation.x) * 0.04;
    groupRef.current.rotation.y += ((mouse.current.x * 0.06) - groupRef.current.rotation.y) * 0.03;
    
    // Scroll drifting
    groupRef.current.position.y = scrollProgress * 6;
    
    // Simplistic Pulse logic
    const pulseCycle = pulseTimer.current % 240;
    
    if (pulseCycle === 0) {
      activeNode.current = Math.floor(Math.random() * NODE_COUNT);
      if (lineMaterialRef.current) {
        lineMaterialRef.current.opacity = 0.5; // active edge pulse
      }
    } else if (pulseCycle === 60) {
      activeNode.current = -1; // reset
      if (lineMaterialRef.current) {
        lineMaterialRef.current.opacity = 0.12; 
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      <instancedMesh ref={instancedMeshRef} args={[undefined, undefined, NODE_COUNT]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color="#C8A96E" transparent opacity={0.22} />
      </instancedMesh>
      
      {/* Edges */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={edgePositions.length / 3}
            array={edgePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial ref={lineMaterialRef} color="#C8A96E" transparent opacity={0.12} />
      </lineSegments>
    </group>
  );
};
