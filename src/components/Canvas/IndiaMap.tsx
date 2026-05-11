import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Stylized Point Cloud for India - Manual approximation of shape
// This is a simplified grid-based filter to simulate the India map shape in 3D
export default function IndiaMap() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const count = 5000;
  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const szs = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
        // More refined India shape approximation (Diamond + V)
        const x = (Math.random() - 0.5) * 5;
        const y = (Math.random() - 0.5) * 6;
        const z = (Math.random() - 0.5) * 0.2;
        
        // India shape filter
        const isIndia = 
            (y > 0 && Math.abs(x) < 2.2 - y * 0.8) || // Top part
            (y <= 0 && Math.abs(x) < 2.2 + y * 1.5);   // Bottom part
        
        if (isIndia) {
            pos[i * 3] = x;
            pos[i * 3 + 1] = y;
            pos[i * 3 + 2] = z;
            
            szs[i] = Math.random() * 0.15 + 0.05;

            const rand = Math.random();
            if (rand > 0.95) {
                // Saffron nodes (Impact points)
                cols[i * 3] = 1;
                cols[i * 3 + 1] = 0.5;
                cols[i * 3 + 2] = 0.2;
                szs[i] *= 4; // Larger impact nodes
            } else {
                // Gold/Blue base
                cols[i * 3] = 0.83; 
                cols[i * 3 + 1] = 0.68;
                cols[i * 3 + 2] = 0.21;
            }
        } else {
            // Move non-india points far away or hide them
            pos[i * 3] = 1000;
        }
    }
    return { positions: pos, colors: cols, sizes: szs };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
        pointsRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
        // Pulse impact nodes using the size attribute (simulated here with scale)
        const s = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.01;
        pointsRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group position={[0, -10, -5]}> 
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
          size={0.12}
          vertexColors
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      {/* Dynamic light sweep */}
      <spotLight 
        position={[0, 10, 0]} 
        intensity={5} 
        angle={0.5} 
        penumbra={1} 
        color="#ff9933"
      />
    </group>
  );
}
