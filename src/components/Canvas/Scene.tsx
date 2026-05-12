import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { 
  Sphere, 
  Float, 
  Stars, 
  PerspectiveCamera, 
  useScroll, 
  Environment,
  ContactShadows,
  MeshDistortMaterial,
  Text,
  PresentationControls
} from '@react-three/drei';
import * as THREE from 'three';
import IndiaMap from './IndiaMap';
import Atmosphere from './Atmosphere';
import HolographicCard from './HolographicCard';

export function Earth() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group>
      <Atmosphere />
      
      {/* Main Earth Body with stylized look */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhysicalMaterial
          color="#0a0502"
          emissive="#4d2c18"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
        
        {/* Glowing Wireframe */}
        <mesh>
          <sphereGeometry args={[2.02, 40, 40]} />
          <meshBasicMaterial color="#ff9933" wireframe transparent opacity={0.1} />
        </mesh>

        {/* Major Impact Points (Glowing Pins) */}
        <group rotation={[0.4, 1.2, 0]}>
           {[
             { pos: [0.6, 1.8, 0.5], label: 'Delhi' },
             { pos: [1.4, 0.8, 1.2], label: 'Mumbai' },
             { pos: [1.8, 0.2, 0.8], label: 'Bangalore' },
           ].map((point, i) => (
             <group key={i} position={point.pos as [number, number, number]}>
                <mesh>
                  <sphereGeometry args={[0.03, 16, 16]} />
                  <meshBasicMaterial color="#ff9933" />
                </mesh>
                <pointLight color="#ff9933" intensity={2} distance={2} />
             </group>
           ))}
        </group>
      </mesh>
    </group>
  );
}

export function EnergyStreams() {
  const lines = useMemo(() => {
    return Array.from({ length: 40 }).map(() => {
      const points = [];
      const radius = 15;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 40;
      for (let j = 0; j < 10; j++) {
        points.push(new THREE.Vector3(
          Math.cos(angle + j * 0.1) * (radius + Math.sin(j) * 2),
          height + j * 2,
          Math.sin(angle + j * 0.1) * (radius + Math.sin(j) * 2)
        ));
      }
      return new THREE.CatmullRomCurve3(points).getPoints(50);
    });
  }, []);

  return (
    <group>
      {lines.map((points, i) => {
        const positions = new Float32Array(points.flatMap(p => [p.x, p.y, p.z]));
        return (
          <line key={i}>
            <bufferGeometry attach="geometry">
              <bufferAttribute
                attach="attributes-position"
                count={points.length}
                array={positions}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial attach="material" color="#D4AF37" transparent opacity={0.15} />
          </line>
        );
      })}
    </group>
  );
}

export function CinematicParticles() {
  const count = 5000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0002;
      pointsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.1) * 2;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#F27D26"
        transparent
        opacity={0.1}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();
  const { camera } = useThree();

  useFrame((state) => {
    if (groupRef.current) {
      const offset = scroll.offset;
      const isMobile = state.size.width < 768;
      
      // Dynamic Camera Path
      if (offset < 0.2) {
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, isMobile ? 12 : 10, 0.05);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0, 0.05);
      } else if (offset < 0.4) {
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, isMobile ? 8 : 5, 0.05);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, -10, 0.05);
        camera.lookAt(0, -10, 0);
      } else {
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, isMobile ? 25 : 20, 0.05);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, -30, 0.05);
      }

      // Parallax effect based on mouse
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, state.mouse.x * 0.1, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -state.mouse.y * 0.1, 0.05);
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={35} />
      <Environment preset="night" />
      
      <ambientLight intensity={0.2} />
      <spotLight position={[20, 20, 20]} intensity={5} color="#D4AF37" angle={0.3} penumbra={1} castShadow />
      <pointLight position={[-15, -15, -15]} intensity={2} color="#F27D26" />
      <directionalLight position={[0, 10, 10]} intensity={1} color="#4287f5" />

      <group ref={groupRef}>
        {/* Main Hero: Earth */}
        <group position={[0, 0, 0]}>
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <Earth />
          </Float>
        </group>

        {/* Section 2: India Impact Map */}
        <group position={[0, -12, 0]} scale={1.5}>
          <IndiaMap />
          <Text position={[0, 4, 0]} fontSize={0.5} font="/fonts/Inter-Bold.ttf" color="gold">
            IMPACT NATIONWIDE
          </Text>
        </group>

        {/* Section 3: Floating Cause Cards */}
        <group position={[0, -25, 0]}>
          <HolographicCard 
            position={[-4, 2, 0]} 
            title="Education" 
            description="Lighting the path for 500k+ students with digital literacy." 
            color="#ff9933"
          />
          <HolographicCard 
            position={[0, 0, 2]} 
            title="Healthcare" 
            description="Mobile clinics reaching the most remote corners of Bharat." 
            color="#4287f5"
          />
          <HolographicCard 
            position={[4, -2, 0]} 
            title="Environment" 
            description="Restoring sacred groves and ancient water bodies." 
            color="#10b981"
          />
        </group>

        {/* Section 4: Donation Hologram Placeholder */}
        <group position={[0, -40, 0]}>
           <Float speed={5} rotationIntensity={2}>
              <mesh>
                <icosahedronGeometry args={[2, 1]} />
                <MeshDistortMaterial color="#D4AF37" speed={2} distort={0.4} transparent opacity={0.6} />
              </mesh>
           </Float>
           <Text position={[0, 4, 0]} fontSize={0.8} color="gold" maxWidth={10} textAlign="center">
             FUEL THE MOVEMENT
           </Text>
        </group>
      </group>

      <EnergyStreams />
      <CinematicParticles />
      <Stars radius={150} depth={60} count={10000} factor={6} saturation={0.5} fade speed={1.5} />
      
      <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.25} far={10} color="#000000" />
    </>
  );
}
