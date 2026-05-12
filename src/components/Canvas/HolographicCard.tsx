import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, RoundedBox, Float } from '@react-three/drei';
import * as THREE from 'three';

interface HolographicCardProps {
  position: [number, number, number];
  title: string;
  description: string;
  color: string;
}

export default function HolographicCard({ position, title, description, color }: HolographicCardProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { viewport } = useThree();
  const scale = viewport.width < 10 ? 0.8 : 1;

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        hovered ? state.mouse.x * 0.2 : 0,
        0.1
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        hovered ? -state.mouse.y * 0.2 : 0,
        0.1
      );
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={position} scale={[scale, scale, scale]}>
        <RoundedBox
          ref={meshRef}
          args={[3, 4, 0.1]}
          radius={0.1}
          smoothness={4}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <meshPhysicalMaterial
            color={color}
            transmission={0.9}
            thickness={0.5}
            roughness={0.1}
            metalness={0.2}
            ior={1.5}
            transparent
            opacity={0.3}
            emissive={color}
            emissiveIntensity={hovered ? 0.5 : 0.2}
          />
        </RoundedBox>

        {/* Card Content */}
        <Text
          position={[0, 1.2, 0.1]}
          fontSize={0.2}
          font="/fonts/Inter-Bold.ttf" // Assuming standard font or similar
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {title.toUpperCase()}
        </Text>

        <Text
          position={[0, 0, 0.1]}
          fontSize={0.12}
          maxWidth={2.5}
          color="white"
          anchorX="center"
          anchorY="middle"
          fillOpacity={0.8}
        >
          {description}
        </Text>

        {/* Glow effect */}
        <pointLight position={[0, 0, 0.5]} intensity={0.5} color={color} />
      </group>
    </Float>
  );
}
