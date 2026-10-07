import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

interface BuildingViewer3DProps {
  accentColor: string;
  roofColor: string;
  floors?: number;
  projectTitle: string;
}

function HighriseModel({
  accentColor,
  roofColor,
  floors = 6,
}: {
  accentColor: string;
  roofColor: string;
  floors?: number;
}) {
  const buildingRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (buildingRef.current) {
      buildingRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group ref={buildingRef} position={[0, -2.5, 0]}>
      {/* Ground Foundation */}
      <mesh position={[0, 0.1, 0]} receiveShadow>
        <cylinderGeometry args={[3.2, 3.4, 0.2, 32]} />
        <meshStandardMaterial color="#DDD7CE" roughness={0.6} />
      </mesh>

      {/* Multi-tier Highrise Tower */}
      {Array.from({ length: floors }).map((_, i) => {
        const floorHeight = 0.7;
        const y = 0.3 + i * floorHeight + floorHeight / 2;
        const width = 2.4 - i * 0.12;

        return (
          <group key={i} position={[0, y, 0]}>
            {/* Core Concrete Structure */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[width, floorHeight * 0.85, width]} />
              <meshPhysicalMaterial
                color="#2C3E50"
                roughness={0.2}
                metalness={0.6}
                clearcoat={0.5}
              />
            </mesh>

            {/* Glowing Glass Balconies */}
            <mesh position={[0, 0, width / 2 + 0.05]}>
              <boxGeometry args={[width * 0.9, floorHeight * 0.4, 0.1]} />
              <meshStandardMaterial
                color={accentColor}
                emissive={accentColor}
                emissiveIntensity={0.5}
                transparent
                opacity={0.8}
              />
            </mesh>

            {/* Side Balcony */}
            <mesh position={[width / 2 + 0.05, 0, 0]}>
              <boxGeometry args={[0.1, floorHeight * 0.4, width * 0.9]} />
              <meshStandardMaterial
                color={accentColor}
                emissive={accentColor}
                emissiveIntensity={0.5}
                transparent
                opacity={0.8}
              />
            </mesh>
          </group>
        );
      })}

      {/* Rooftop Penthouse & Infinity Pool */}
      <group position={[0, 0.3 + floors * 0.7 + 0.3, 0]}>
        {/* Penthouse Cube */}
        <mesh castShadow>
          <boxGeometry args={[1.4, 0.6, 1.4]} />
          <meshStandardMaterial color={roofColor} metalness={0.8} />
        </mesh>
        {/* Infinity Pool Water */}
        <mesh position={[0, 0.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.2, 1.2]} />
          <meshStandardMaterial
            color="#00E5FF"
            emissive="#00B0FF"
            emissiveIntensity={0.6}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        {/* Crown Beacon / Helipad ring */}
        <mesh position={[0, 0.7, 0]}>
          <torusGeometry args={[0.5, 0.04, 12, 24]} />
          <meshBasicMaterial color="#F2B84B" />
        </mesh>
      </group>
    </group>
  );
}

export function BuildingViewer3D({
  accentColor,
  roofColor,
  floors = 6,
}: BuildingViewer3DProps) {
  return (
    <View style={styles.viewerContainer}>
      <Canvas
        shadows
        camera={{ position: [5, 4, 6], fov: 45 }}
        style={styles.canvas}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[10, 15, 10]} intensity={1.8} castShadow />
        <pointLight position={[-6, 8, -6]} color={accentColor} intensity={2.0} />

        <OrbitControls
          enableZoom={true}
          autoRotate={false}
          maxPolarAngle={Math.PI / 2}
          minDistance={4}
          maxDistance={14}
        />

        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
          <HighriseModel
            accentColor={accentColor}
            roofColor={roofColor}
            floors={floors}
          />
        </Float>
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  viewerContainer: {
    height: 220,
    width: '100%',
    backgroundColor: '#F4F0E8',
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E7E2D9',
  },
  canvas: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
