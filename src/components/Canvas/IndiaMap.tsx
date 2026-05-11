import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Stylized Point Cloud for India - Manual approximation of shape
// This is a simplified grid-based filter to simulate the India map shape in 3D
export default function IndiaMap() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const count = 3000;
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    
    // Generating a rough diamond/triangular shape that resembles India
    for (let i = 0; i < count; i++) {
        // Simple shape generation logic
        const x = (Math.random() - 0.5) * 4;
        const y = (Math.random() - 0.7) * 5;
        const z = (Math.random() - 0.5) * 0.5;
        
        // Basic filter for India boundary (V-shape)
        const isIndia = Math.abs(x) < (y > 0 ? 2 - y * 0.5 : 2 + y * 2);
        
        if (isIndia) {
            pos[i * 3] = x;
            pos[i * 3 + 1] = y;
            pos[i * 3 + 2] = z;
            
            // Random sparks of Saffron and Emerald
            const rand = Math.random();
            if (rand > 0.9) {
                cols[i * 3] = 1; // R
                cols[i * 3 + 1] = 0.6; // G
                cols[i * 3 + 2] = 0.2; // B (Saffron)
            } else if (rand < 0.1) {
                cols[i * 3] = 0.1; // R
                cols[i * 3 + 1] = 0.8; // G
                cols[i * 3 + 2] = 0.3; // B (Emerald)
            } else {
                cols[i * 3] = 0.2; // R
                cols[i * 3 + 1] = 0.5; // G
                cols[i * 3 + 2] = 1; // B (Blue)
            }
        }
    }
    return { positions: pos, colors: cols };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
        pointsRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
        // Pulse scaling
        const s = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.02;
        pointsRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group position={[0, -10, -5]}> {/* Positioned below Earth for scroll reveal */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={count}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      {/* Glow highlight */}
      <pointLight color="#4287f5" intensity={10} distance={10} />
    </group>
  );
}
