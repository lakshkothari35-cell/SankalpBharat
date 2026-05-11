import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Float, Stars, PerspectiveCamera, useScroll } from '@react-three/drei';
import * as THREE from 'three';
import IndiaMap from './IndiaMap';

export function Earth() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group>
      {/* Atmosphere Glow */}
      <Sphere args={[2.2, 64, 64]}>
        <meshBasicMaterial
          color="#4287f5"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Main Earth Body */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color="#0a0502"
          emissive="#4d2c18"
          emissiveIntensity={0.6}
          roughness={0.4}
          metalness={0.6}
        />
        
        {/* Wireframe overlay */}
        <mesh>
          <sphereGeometry args={[2.01, 32, 32]} />
          <meshBasicMaterial color="#D4AF37" wireframe transparent opacity={0.05} />
        </mesh>

        {/* City Glows - Approx positions on the sphere mapped to India region */}
        <group rotation={[0, 1.4, 0]}>
           {/* Delhi */}
           <pointLight position={[0.6, 1.8, 0.5]} color="#ff9933" intensity={2} distance={1} />
           <Sphere position={[0.6, 1.8, 0.5]} args={[0.02, 8, 8]}>
             <meshBasicMaterial color="#ff9933" />
           </Sphere>
           {/* Mumbai */}
           <pointLight position={[1.4, 0.8, 1.2]} color="#ff9933" intensity={2} distance={1} />
           <Sphere position={[1.4, 0.8, 1.2]} args={[0.02, 8, 8]}>
             <meshBasicMaterial color="#ff9933" />
           </Sphere>
           {/* Bangalore */}
           <pointLight position={[1.8, 0.2, 0.8]} color="#ff9933" intensity={2} distance={1} />
           <Sphere position={[1.8, 0.2, 0.8]} args={[0.02, 8, 8]}>
             <meshBasicMaterial color="#ff9933" />
           </Sphere>
        </group>
      </mesh>
    </group>
  );
}

export function BackgroundParticles() {
  const count = 3000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0003;
      pointsRef.current.rotation.x += 0.0001;
    }
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
        size={0.06}
        color="#F27D26"
        transparent
        opacity={0.2}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  useFrame((state) => {
    if (groupRef.current) {
      // Camera / Scene movement based on scroll
      const offset = scroll.offset;
      groupRef.current.position.y = offset * 25;
      
      // Dynamic camera tilt
      state.camera.position.x = Math.sin(state.mouse.x * 0.5) * 2;
      state.camera.position.y = Math.sin(state.mouse.y * 0.5) * 2;
      state.camera.lookAt(0, -offset * 10, 0);
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={4} color="#D4AF37" />
      <pointLight position={[-10, -10, -10]} intensity={2} color="#F27D26" />
      <spotLight position={[0, 10, 0]} intensity={1} angle={0.2} penumbra={1} color="#800000" />
      
      <group ref={groupRef}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Earth />
        </Float>
        
        <IndiaMap />
      </group>
      
      <BackgroundParticles />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </>
  );
}
