import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import type { RealEstateStall } from './index';

interface FairgroundScene3DProps {
  stalls: RealEstateStall[];
  activeCategory: string;
  selectedStallId: string | null;
  onSelectStall: (stall: RealEstateStall) => void;
  onSelectActivity?: (activityName: string, detail: string) => void;
  cameraPreset: 'isometric' | 'birdsEye' | 'streetLevel' | 'nightMode';
}

// 3D Tree Component
function LowPolyTree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.18, 1.0, 6]} />
        <meshStandardMaterial color="#5D4037" roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.3, 0]} castShadow>
        <coneGeometry args={[0.9, 1.2, 7]} />
        <meshStandardMaterial color="#2E7D32" roughness={0.7} />
      </mesh>
      <mesh position={[0, 2.0, 0]} castShadow>
        <coneGeometry args={[0.7, 1.0, 7]} />
        <meshStandardMaterial color="#388E3C" roughness={0.7} />
      </mesh>
    </group>
  );
}

// 3D Street Light Pole
function StreetLamp({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.04, 0.07, 2.2, 6]} />
        <meshStandardMaterial color="#263238" metalness={0.8} />
      </mesh>
      <mesh position={[0, 2.2, 0]}>
        <sphereGeometry args={[0.14, 12, 12]} />
        <meshBasicMaterial color="#FFE082" />
      </mesh>
      <pointLight position={[0, 2.2, 0]} color="#FFE082" intensity={1.2} distance={7} />
    </group>
  );
}

export interface Waypoint {
  pos: [number, number, number];
  pauseDuration?: number; // seconds to pause and view stall
  lookAt?: [number, number, number]; // where to face when paused
  actionLabel?: string; // bubble text e.g. "🏢 Touring Shanta"
}

// REALISTIC CALM STALL-VISITOR WALKER (Walks exact paths & visits stalls)
function StallVisitorWalker({
  waypoints,
  speed = 1.1, // natural walking speed (calm stroll)
  shirtColor = '#D95D45',
  pantsColor = '#1F2937',
  skinColor = '#D7CCC8',
  hairColor = '#212121',
  startWaypointIndex = 0,
}: {
  waypoints: Waypoint[];
  speed?: number;
  shirtColor?: string;
  pantsColor?: string;
  skinColor?: string;
  hairColor?: string;
  startWaypointIndex?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);

  // State inside refs for smooth 60fps frame updates
  const stateRef = useRef({
    currentIdx: startWaypointIndex % Math.max(1, waypoints.length),
    tInSegment: 0,
    pauseTimer: 0,
    walkDistance: 0,
    isPaused: false,
    prevAction: '',
  });

  const [activeAction, setActiveAction] = useState<string>('');

  useFrame((_, delta) => {
    if (!groupRef.current || waypoints.length < 2) return;
    const dt = Math.min(delta, 0.05); // cap delta to avoid jumps
    const state = stateRef.current;

    const fromWP = waypoints[state.currentIdx];
    const nextIdx = (state.currentIdx + 1) % waypoints.length;
    const toWP = waypoints[nextIdx];

    const dx = toWP.pos[0] - fromWP.pos[0];
    const dy = toWP.pos[1] - fromWP.pos[1];
    const dz = toWP.pos[2] - fromWP.pos[2];
    const segmentDistance = Math.hypot(dx, dz);

    if (state.pauseTimer > 0) {
      // Paused at stall / attraction
      state.pauseTimer -= dt;
      state.isPaused = true;

      // Face lookAt target smoothly if provided
      if (fromWP.lookAt) {
        const lookDx = fromWP.lookAt[0] - groupRef.current.position.x;
        const lookDz = fromWP.lookAt[2] - groupRef.current.position.z;
        const targetRot = Math.atan2(lookDx, lookDz);
        let diff = targetRot - groupRef.current.rotation.y;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        groupRef.current.rotation.y += diff * dt * 4.0;
      }

      // Limbs return to standing upright gently
      if (leftLegRef.current) leftLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLegRef.current.rotation.x, 0, dt * 6);
      if (rightLegRef.current) rightLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLegRef.current.rotation.x, 0, dt * 6);
      if (leftArmRef.current) leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, 0, dt * 6);
      if (rightArmRef.current) rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, 0, dt * 6);

      if (fromWP.actionLabel && state.prevAction !== fromWP.actionLabel) {
        state.prevAction = fromWP.actionLabel;
        setActiveAction(fromWP.actionLabel);
      }
      return;
    }

    if (state.prevAction !== '') {
      state.prevAction = '';
      setActiveAction('');
    }
    state.isPaused = false;

    if (segmentDistance <= 0.001) {
      state.currentIdx = nextIdx;
      return;
    }

    // Advance position along waypoint path
    const step = speed * dt;
    state.tInSegment += step / segmentDistance;
    state.walkDistance += step;

    if (state.tInSegment >= 1.0) {
      state.tInSegment = 0;
      state.currentIdx = nextIdx;
      // Arrived at toWP, check for pause
      if (toWP.pauseDuration && toWP.pauseDuration > 0) {
        state.pauseTimer = toWP.pauseDuration;
      }
      groupRef.current.position.set(toWP.pos[0], toWP.pos[1], toWP.pos[2]);
    } else {
      const curX = fromWP.pos[0] + dx * state.tInSegment;
      const curY = fromWP.pos[1] + dy * state.tInSegment;
      const curZ = fromWP.pos[2] + dz * state.tInSegment;
      groupRef.current.position.set(curX, curY, curZ);

      // Smooth facing along path direction
      const travelAngle = Math.atan2(dx, dz);
      let diff = travelAngle - groupRef.current.rotation.y;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;
      groupRef.current.rotation.y += diff * dt * 7.0;
    }

    // Calm realistic walking stride (matching speed)
    const legPhase = state.walkDistance * 3.5;
    const legSwing = Math.sin(legPhase) * 0.32;
    const armSwing = Math.sin(legPhase + Math.PI) * 0.28;

    if (leftLegRef.current) leftLegRef.current.rotation.x = legSwing;
    if (rightLegRef.current) rightLegRef.current.rotation.x = -legSwing;
    if (leftArmRef.current) leftArmRef.current.rotation.x = armSwing;
    if (rightArmRef.current) rightArmRef.current.rotation.x = -armSwing;
  });

  return (
    <group ref={groupRef} position={waypoints[startWaypointIndex]?.pos || [0, 0.26, 0]}>
      {/* Head */}
      <mesh position={[0, 1.25, 0]} castShadow>
        <sphereGeometry args={[0.13, 10, 10]} />
        <meshStandardMaterial color={skinColor} roughness={0.6} />
      </mesh>
      {/* Hair / Cap */}
      <mesh position={[0, 1.34, 0]}>
        <sphereGeometry args={[0.11, 8, 8]} />
        <meshStandardMaterial color={hairColor} roughness={0.9} />
      </mesh>

      {/* Torso (Shirt / Panjabi) */}
      <mesh position={[0, 0.85, 0]} castShadow>
        <boxGeometry args={[0.32, 0.48, 0.22]} />
        <meshStandardMaterial color={shirtColor} roughness={0.5} />
      </mesh>

      {/* Left Arm */}
      <mesh ref={leftArmRef} position={[-0.22, 0.82, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.38, 6]} />
        <meshStandardMaterial color={shirtColor} />
      </mesh>

      {/* Right Arm */}
      <mesh ref={rightArmRef} position={[0.22, 0.82, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.38, 6]} />
        <meshStandardMaterial color={shirtColor} />
      </mesh>

      {/* Left Leg */}
      <mesh ref={leftLegRef} position={[-0.1, 0.32, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.55, 6]} />
        <meshStandardMaterial color={pantsColor} />
      </mesh>

      {/* Right Leg */}
      <mesh ref={rightLegRef} position={[0.1, 0.32, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.55, 6]} />
        <meshStandardMaterial color={pantsColor} />
      </mesh>

      {/* Action/Visiting Bubble */}
      {activeAction !== '' && (
        <Html position={[0, 1.7, 0]} center distanceFactor={14} style={{ pointerEvents: 'none' }}>
          <div style={{
            backgroundColor: 'rgba(12, 28, 35, 0.95)',
            color: '#FFE082',
            fontSize: 8,
            padding: '2px 8px',
            borderRadius: 8,
            border: '1px solid #FFE082',
            fontWeight: '800',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 10px rgba(0,0,0,0.6)',
          }}>
            {activeAction}
          </div>
        </Html>
      )}
    </group>
  );
}

// STATIONARY CHATTING CROWD CLUSTER (Set safely on promenade edges)
function CrowdCluster({ position, label }: { position: [number, number, number]; label?: string }) {
  const people = [
    { offset: [-0.3, 0, -0.2], shirt: '#E91E63', pants: '#1A237E', rot: 0.8 },
    { offset: [0.35, 0, -0.1], shirt: '#00BCD4', pants: '#263238', rot: -1.2 },
    { offset: [0.0, 0, 0.3], shirt: '#FFC107', pants: '#3E2723', rot: 3.14 },
  ];

  return (
    <group position={position}>
      {people.map((p, i) => (
        <group key={i} position={p.offset as any} rotation={[0, p.rot, 0]}>
          <mesh position={[0, 1.2, 0]} castShadow>
            <sphereGeometry args={[0.12, 10, 10]} />
            <meshStandardMaterial color="#FFE0B2" />
          </mesh>
          <mesh position={[0, 0.8, 0]} castShadow>
            <boxGeometry args={[0.3, 0.44, 0.2]} />
            <meshStandardMaterial color={p.shirt} />
          </mesh>
          <mesh position={[-0.08, 0.3, 0]}>
            <cylinderGeometry args={[0.045, 0.045, 0.52, 6]} />
            <meshStandardMaterial color={p.pants} />
          </mesh>
          <mesh position={[0.08, 0.3, 0]}>
            <cylinderGeometry args={[0.045, 0.045, 0.52, 6]} />
            <meshStandardMaterial color={p.pants} />
          </mesh>
        </group>
      ))}

      {label && (
        <Html position={[0, 1.8, 0]} center distanceFactor={14} style={{ pointerEvents: 'none' }}>
          <div style={{
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: '#B2DFDB',
            fontSize: 7,
            padding: '1px 5px',
            borderRadius: 6,
            fontWeight: '700',
            whiteSpace: 'nowrap',
          }}>
            👥 {label}
          </div>
        </Html>
      )}
    </group>
  );
}

// 1. ANIMATED 3D NAGORDOLA (TRADITIONAL BANGLADESHI FERRIS WHEEL)
function NagordolaWheel({
  position,
  onRide,
}: {
  position: [number, number, number];
  onRide?: () => void;
}) {
  const wheelRef = useRef<THREE.Group>(null);
  const [speedBoost, setSpeedBoost] = useState(false);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (wheelRef.current) {
      const speed = speedBoost ? 1.6 : 0.5;
      wheelRef.current.rotation.z = clock.getElapsedTime() * speed;
    }
  });

  const seatColors = ['#FF1744', '#00E5FF', '#FFD600', '#00E676', '#E040FB', '#FF6D00'];
  const radius = 2.4;

  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        setSpeedBoost(!speedBoost);
        onRide?.();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      {/* Supporting A-Frame Wooden Pillars */}
      <mesh position={[-1.0, 2.2, 0]} rotation={[0, 0, 0.2]} castShadow>
        <cylinderGeometry args={[0.12, 0.18, 4.6, 6]} />
        <meshStandardMaterial color="#8D6E63" roughness={0.8} />
      </mesh>
      <mesh position={[1.0, 2.2, 0]} rotation={[0, 0, -0.2]} castShadow>
        <cylinderGeometry args={[0.12, 0.18, 4.6, 6]} />
        <meshStandardMaterial color="#8D6E63" roughness={0.8} />
      </mesh>
      <mesh position={[-1.0, 2.2, -0.9]} rotation={[0, 0, 0.2]} castShadow>
        <cylinderGeometry args={[0.12, 0.18, 4.6, 6]} />
        <meshStandardMaterial color="#6D4C41" roughness={0.8} />
      </mesh>
      <mesh position={[1.0, 2.2, -0.9]} rotation={[0, 0, -0.2]} castShadow>
        <cylinderGeometry args={[0.12, 0.18, 4.6, 6]} />
        <meshStandardMaterial color="#6D4C41" roughness={0.8} />
      </mesh>

      {/* Central Axle */}
      <mesh position={[0, 3.4, -0.45]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.18, 1.3, 12]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.8} />
      </mesh>

      {/* Rotating Wheel */}
      <group ref={wheelRef} position={[0, 3.4, -0.45]}>
        <mesh>
          <torusGeometry args={[radius, 0.07, 12, 32]} />
          <meshStandardMaterial color="#FFE082" metalness={0.7} />
        </mesh>
        <mesh>
          <torusGeometry args={[radius * 0.5, 0.05, 12, 24]} />
          <meshStandardMaterial color="#FFB300" metalness={0.7} />
        </mesh>

        {seatColors.map((color, i) => {
          const angle = (i * Math.PI * 2) / seatColors.length;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <group key={i}>
              <mesh
                position={[x / 2, y / 2, 0]}
                rotation={[0, 0, angle - Math.PI / 2]}
              >
                <cylinderGeometry args={[0.035, 0.035, radius, 6]} />
                <meshStandardMaterial color="#D4AF37" metalness={0.8} />
              </mesh>

              <group position={[x, y, 0]}>
                <mesh position={[0, -0.35, 0]} castShadow>
                  <boxGeometry args={[0.65, 0.5, 0.55]} />
                  <meshStandardMaterial color={color} roughness={0.3} metalness={0.6} />
                </mesh>
                <mesh position={[0, -0.05, 0]}>
                  <coneGeometry args={[0.5, 0.3, 4]} />
                  <meshStandardMaterial color="#FFF9C4" roughness={0.4} />
                </mesh>
              </group>
            </group>
          );
        })}
      </group>

      {/* Ground Platform */}
      <mesh position={[0, 0.05, -0.45]} receiveShadow>
        <cylinderGeometry args={[3.2, 3.5, 0.2, 24]} />
        <meshStandardMaterial color="#4E342E" roughness={0.9} />
      </mesh>

      {/* Label */}
      <Html position={[0, 6.2, -0.45]} center distanceFactor={16} style={{ pointerEvents: 'none' }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          transform: hovered ? 'scale(1.15)' : 'scale(1)',
          transition: 'transform 0.2s',
        }}>
          <div style={{
            backgroundColor: '#FF1744',
            color: '#FFFFFF',
            padding: '4px 12px',
            borderRadius: 12,
            fontSize: 10,
            fontWeight: '900',
            letterSpacing: '1px',
            border: '1.5px solid #FFE082',
            boxShadow: '0 4px 14px rgba(255,23,68,0.5)',
            whiteSpace: 'nowrap',
          }}>
            🎡 NAGORDOLA FERRIS WHEEL
          </div>
          <div style={{
            backgroundColor: 'rgba(0,0,0,0.75)',
            color: '#FFE082',
            fontSize: 9,
            padding: '2px 8px',
            borderRadius: 8,
            fontWeight: '800',
          }}>
            {speedBoost ? '⚡ Fast Spin Mode' : 'Click to Ride & Spin!'}
          </div>
        </div>
      </Html>
    </group>
  );
}

// 2. BALLOON SHOOTING CARNIVAL BOOTH
function BalloonDartBooth({
  position,
  onPlay,
}: {
  position: [number, number, number];
  onPlay?: () => void;
}) {
  const [poppedCount, setPoppedCount] = useState(0);
  const colors = ['#FF1744', '#00E5FF', '#FFEA00', '#00E676', '#E040FB', '#FF9100', '#76FF03', '#D500F9', '#FF3D00'];

  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        setPoppedCount((prev) => (prev + 1) % 10);
        onPlay?.();
      }}
    >
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.8, 1.2, 2.0]} />
        <meshStandardMaterial color="#5D4037" roughness={0.8} />
      </mesh>

      <mesh position={[0, 1.7, -0.8]} castShadow>
        <boxGeometry args={[2.6, 1.5, 0.15]} />
        <meshStandardMaterial color="#D7CCC8" roughness={0.7} />
      </mesh>

      {colors.map((color, i) => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        const x = (col - 1) * 0.7;
        const y = 1.3 + row * 0.5;
        const isPopped = i < poppedCount;

        if (isPopped) return null;

        return (
          <mesh key={i} position={[x, y, -0.7]} castShadow>
            <sphereGeometry args={[0.16, 12, 12]} />
            <meshStandardMaterial color={color} roughness={0.2} metalness={0.4} />
          </mesh>
        );
      })}

      <mesh position={[0, 2.6, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[1.8, 0.9, 4]} />
        <meshStandardMaterial color="#D50000" roughness={0.4} />
      </mesh>

      <Html position={[0, 3.3, 0]} center distanceFactor={16} style={{ pointerEvents: 'none' }}>
        <div style={{
          backgroundColor: '#FF6D00',
          color: '#FFFFFF',
          padding: '3px 10px',
          borderRadius: 10,
          fontSize: 9,
          fontWeight: '900',
          letterSpacing: '0.8px',
          border: '1px solid #FFE082',
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
          whiteSpace: 'nowrap',
        }}>
          🎯 BALLOON SHOOTING ({9 - poppedCount} Left)
        </div>
      </Html>
    </group>
  );
}

// 3. LIVE FOLK & BAUL MUSIC STAGE
function BaulGaanStage({ position, onListen }: { position: [number, number, number]; onListen?: () => void }) {
  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onListen?.();
      }}
    >
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.2, 0.8, 3.2]} />
        <meshStandardMaterial color="#8D6E63" roughness={0.7} />
      </mesh>

      <mesh position={[0, 1.8, -1.5]} castShadow>
        <boxGeometry args={[4.0, 2.4, 0.12]} />
        <meshStandardMaterial color="#B71C1C" roughness={0.5} />
      </mesh>

      <mesh position={[0, 3.1, 0]} castShadow>
        <boxGeometry args={[4.4, 0.25, 3.4]} />
        <meshStandardMaterial color="#FFB300" roughness={0.6} />
      </mesh>

      <mesh position={[-1.1, 0.9, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.26, 0.26, 0.7, 12]} />
        <meshStandardMaterial color="#BF360C" roughness={0.6} />
      </mesh>
      <mesh position={[1.1, 1.2, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1.4, 6]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.8} />
      </mesh>

      <pointLight position={[-1.5, 2.8, 1.0]} color="#00E5FF" intensity={1.8} distance={7} />
      <pointLight position={[1.5, 2.8, 1.0]} color="#FFD600" intensity={1.8} distance={7} />

      <Html position={[0, 3.6, 0]} center distanceFactor={16} style={{ pointerEvents: 'none' }}>
        <div style={{
          backgroundColor: '#B71C1C',
          color: '#FFFFFF',
          padding: '4px 12px',
          borderRadius: 10,
          fontSize: 10,
          fontWeight: '900',
          letterSpacing: '1px',
          border: '1.5px solid #FFE082',
          boxShadow: '0 4px 14px rgba(183,28,28,0.6)',
          whiteSpace: 'nowrap',
        }}>
          🪘 LIVE BAUL &amp; FOLK STAGE
        </div>
      </Html>
    </group>
  );
}

// 4. MELA STREET FOOD STALL
function MelaFoodStall({
  position,
  name,
  code,
  color,
  onTaste,
}: {
  position: [number, number, number];
  name: string;
  code: string;
  color: string;
  onTaste?: () => void;
}) {
  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onTaste?.();
      }}
    >
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 1.2, 1.8]} />
        <meshStandardMaterial color="#3E2723" roughness={0.7} />
      </mesh>

      <mesh position={[0, 1.8, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[1.5, 0.7, 4]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>

      <pointLight position={[0, 1.3, 0.5]} color="#FFE082" intensity={1.2} distance={4} />

      <Html position={[0, 2.4, 0]} center distanceFactor={15} style={{ pointerEvents: 'none' }}>
        <div style={{
          backgroundColor: color,
          color: '#FFFFFF',
          padding: '3px 8px',
          borderRadius: 8,
          fontSize: 9,
          fontWeight: '800',
          whiteSpace: 'nowrap',
          border: '1px solid #FFFFFF',
        }}>
          {code} · {name}
        </div>
      </Html>
    </group>
  );
}

// 5. ARTISAN CRAFT STALL
function MelaCraftStall({
  position,
  name,
  code,
  color,
  onExplore,
}: {
  position: [number, number, number];
  name: string;
  code: string;
  color: string;
  onExplore?: () => void;
}) {
  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onExplore?.();
      }}
    >
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 1.2, 1.8]} />
        <meshStandardMaterial color="#263238" roughness={0.6} />
      </mesh>
      <mesh position={[0, 1.8, 0]} castShadow>
        <boxGeometry args={[2.6, 0.25, 2.0]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>

      <Html position={[0, 2.3, 0]} center distanceFactor={15} style={{ pointerEvents: 'none' }}>
        <div style={{
          backgroundColor: color,
          color: '#FFFFFF',
          padding: '3px 8px',
          borderRadius: 8,
          fontSize: 9,
          fontWeight: '800',
          whiteSpace: 'nowrap',
          border: '1px solid #FFFFFF',
        }}>
          {code} · {name}
        </div>
      </Html>
    </group>
  );
}

// Central Fountain
function CentralFountain({ position }: { position: [number, number, number] }) {
  const waterRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (waterRef.current) {
      const t = clock.getElapsedTime();
      waterRef.current.position.y = 0.4 + Math.sin(t * 3) * 0.04;
    }
  });

  return (
    <group position={position}>
      <mesh position={[0, 0.2, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[2.8, 3.0, 0.4, 32]} />
        <meshStandardMaterial color="#B0BEC5" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.35, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[1.7, 1.8, 0.35, 24]} />
        <meshStandardMaterial color="#78909C" roughness={0.4} />
      </mesh>
      <mesh ref={waterRef} position={[0, 0.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.65, 24]} />
        <meshStandardMaterial
          color="#00E5FF"
          roughness={0.1}
          metalness={0.8}
          emissive="#00B0FF"
          emissiveIntensity={0.35}
        />
      </mesh>
      <mesh position={[0, 0.8, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.25, 1.0, 12]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 1.4, 0]}>
        <sphereGeometry args={[0.25, 12, 12]} />
        <meshBasicMaterial color="#E0F7FA" transparent opacity={0.8} />
      </mesh>
      <pointLight position={[0, 1.5, 0]} color="#00E5FF" intensity={2.0} distance={8} />
      <Html position={[0, 2.0, 0]} center distanceFactor={16}>
        <div style={{
          backgroundColor: 'rgba(10, 26, 33, 0.92)',
          padding: '4px 12px',
          borderRadius: 12,
          border: '1px solid #FFE082',
          color: '#FFE082',
          fontSize: 10,
          fontWeight: '800',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          boxShadow: '0 4px 14px rgba(0,0,0,0.6)',
        }}>
          CENTRAL FOUNTAIN PLAZA
        </div>
      </Html>
    </group>
  );
}

// 3D Real Estate Stall Mesh (Positioned off roads on dedicated plots)
function RealEstateStallMesh({
  stall,
  stallIndex,
  isFilteredIn,
  isSelected,
  onSelect,
}: {
  stall: RealEstateStall;
  stallIndex: number;
  isFilteredIn: boolean;
  isSelected: boolean;
  onSelect: (stall: RealEstateStall) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);

  // Realigned clean coordinates: Strictly OFF the main walkways (no stall at x=0 or z=0!)
  const get3DCoords = (idx: number): [number, number, number] => {
    switch (idx) {
      case 0: return [-8.0, 0, -9.0];   // Shanta (North-West Avenue)
      case 1: return [8.0, 0, -9.0];    // Sheltech (North-East Avenue)
      case 2: return [-18.0, 0, -9.0];  // Navana (North-West Outer)
      case 3: return [18.0, 0, -9.0];   // bti (North-East Outer - completely off road!)
      case 4: return [-18.0, 0, 9.0];   // Rangs (South-West Outer)
      case 5: return [-8.0, 0, 9.0];    // Concord (South-West Avenue)
      case 6: return [8.0, 0, 9.0];     // Assure (South-East Avenue - completely off road!)
      case 7: return [18.0, 0, 9.0];    // Bay (South-East Outer)
      case 8: return [-18.0, 0, -17.0]; // Dom-Inno (Far North-West)
      case 9: return [18.0, 0, -17.0];  // Rupayan City (Far North-East)
      case 10: return [-18.0, 0, 17.0]; // Suvastu (Far South-West)
      case 11: return [18.0, 0, 17.0];  // Urban Design (Far South-East)
      default: return [-8.0, 0, 17.0];
    }
  };

  const coords = get3DCoords(stallIndex);
  const buildingHeight = stall.heightFloor === 3 ? 2.6 : 2.0;
  const scale = hovered ? 1.08 : 1.0;

  useFrame(({ clock }) => {
    if (groupRef.current && hovered) {
      groupRef.current.position.y = coords[1] + Math.sin(clock.getElapsedTime() * 4) * 0.06 + 0.1;
    } else if (groupRef.current) {
      groupRef.current.position.y = coords[1];
    }
  });

  return (
    <group
      ref={groupRef}
      position={coords}
      scale={[scale, scale, scale]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(stall);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      {/* Base Podium Slab */}
      <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.6, 0.24, 3.4]} />
        <meshStandardMaterial color="#1E2B30" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Main Glass Showroom Box */}
      <mesh position={[0, 0.12 + buildingHeight / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, buildingHeight, 3.0]} />
        <meshPhysicalMaterial
          color={stall.wallColor}
          roughness={0.15}
          metalness={0.4}
          transparent
          opacity={isFilteredIn ? (hovered ? 0.95 : 0.85) : 0.3}
          clearcoat={0.6}
          emissive={hovered ? stall.accentColor : '#000000'}
          emissiveIntensity={hovered ? 0.35 : 0}
        />
      </mesh>

      {/* Front Entrance Cutout Glass */}
      <mesh position={[0, 0.12 + buildingHeight / 2, 1.51]}>
        <planeGeometry args={[1.6, buildingHeight * 0.7]} />
        <meshStandardMaterial
          color="#FFE082"
          transparent
          opacity={0.3}
          emissive="#FFE082"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* 3D Roof Deck */}
      <mesh position={[0, 0.12 + buildingHeight + 0.18, 0]} castShadow>
        <boxGeometry args={[3.5, 0.35, 3.3]} />
        <meshStandardMaterial
          color={hovered ? stall.accentColor : stall.roofColor}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Roof Skylight Grid */}
      <mesh position={[0, 0.12 + buildingHeight + 0.37, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.0, 1.8]} />
        <meshStandardMaterial
          color="#E0F7FA"
          roughness={0.1}
          metalness={0.9}
          emissive={stall.accentColor}
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Floating 3D Beacon Pin */}
      <Float speed={2.5} rotationIntensity={0.2} floatIntensity={0.4}>
        <group position={[0, buildingHeight + 1.4, 0]}>
          <mesh castShadow>
            <octahedronGeometry args={[0.28, 0]} />
            <meshStandardMaterial
              color={stall.accentColor}
              emissive={stall.accentColor}
              emissiveIntensity={0.8}
              roughness={0.2}
              metalness={0.9}
            />
          </mesh>
          <pointLight color={stall.accentColor} intensity={2.0} distance={6} />
        </group>
      </Float>

      {/* HTML Overlay Marker */}
      <Html
        position={[0, buildingHeight + 0.8, 0]}
        center
        distanceFactor={15}
        style={{ pointerEvents: 'none' }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          transform: hovered ? 'scale(1.15)' : 'scale(1)',
          transition: 'transform 0.2s ease',
          userSelect: 'none',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            backgroundColor: 'rgba(12, 28, 35, 0.94)',
            padding: '4px 10px',
            borderRadius: 12,
            border: `1.5px solid ${hovered ? '#FFE082' : stall.accentColor}`,
            boxShadow: `0 4px 14px ${stall.accentColor}40`,
          }}>
            <span style={{
              backgroundColor: stall.accentColor,
              color: '#FFFFFF',
              fontSize: 9,
              fontWeight: '900',
              padding: '1px 5px',
              borderRadius: 4,
            }}>
              {stall.code}
            </span>
            <span style={{
              color: '#FFFFFF',
              fontSize: 11,
              fontWeight: '800',
              whiteSpace: 'nowrap',
            }}>
              {stall.name}
            </span>
          </div>

          <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: '#B2DFDB',
            fontSize: 8,
            fontWeight: '700',
            padding: '2px 8px',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}>
            <span style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: '#00E676' }} />
            {stall.visitorsNow} inside
          </div>
        </div>
      </Html>
    </group>
  );
}

// Realistic Fairground Terrain with Paved Corridors, Plaza Ring & Stall Connecting Ramps
function FairgroundTerrain() {
  return (
    <group position={[0, -0.1, 0]}>
      {/* 3D Elevated Lawn Base */}
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[60, 0.5, 48]} />
        <meshStandardMaterial color="#1A5134" roughness={0.85} />
      </mesh>

      {/* Bevel Rim Base Layer */}
      <mesh position={[0, -0.35, 0]} receiveShadow>
        <boxGeometry args={[60.6, 0.4, 48.6]} />
        <meshStandardMaterial color="#0A1E27" roughness={0.9} />
      </mesh>

      {/* Main North-South Promenade (CLEAR WALKWAY) */}
      <mesh position={[0, 0.26, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[3.6, 47.5]} />
        <meshStandardMaterial color="#CBB28C" roughness={0.7} />
      </mesh>

      {/* Main East-West Promenade (CLEAR WALKWAY) */}
      <mesh position={[0, 0.265, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[59.5, 3.6]} />
        <meshStandardMaterial color="#CBB28C" roughness={0.7} />
      </mesh>

      {/* North Loop Connector Road */}
      <mesh position={[0, 0.262, -13.0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[44.0, 2.0]} />
        <meshStandardMaterial color="#DFC8A5" roughness={0.65} />
      </mesh>

      {/* South Loop Connector Road */}
      <mesh position={[0, 0.262, 13.0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[44.0, 2.0]} />
        <meshStandardMaterial color="#DFC8A5" roughness={0.65} />
      </mesh>

      {/* Plaza Round Ring Road (Encircles Fountain Outer Rim) */}
      <mesh position={[0, 0.27, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[2.85, 5.8, 36]} />
        <meshStandardMaterial color="#DFC8A5" roughness={0.6} />
      </mesh>

      {/* Connecting Pavements to Stalls */}
      {/* North-West Stalls (Shanta RE-01 & Navana RE-03 & Craft CR-01) */}
      <mesh position={[-8.0, 0.261, -7.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.2, 3.0]} />
        <meshStandardMaterial color="#DFC8A5" roughness={0.7} />
      </mesh>
      <mesh position={[-18.0, 0.261, -7.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.2, 3.0]} />
        <meshStandardMaterial color="#DFC8A5" roughness={0.7} />
      </mesh>
      <mesh position={[-8.0, 0.261, -2.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.0, 1.8]} />
        <meshStandardMaterial color="#DFC8A5" roughness={0.7} />
      </mesh>

      {/* North-East Stalls (Sheltech RE-02 & bti RE-04 & Craft CR-02) */}
      <mesh position={[8.0, 0.261, -7.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.2, 3.0]} />
        <meshStandardMaterial color="#DFC8A5" roughness={0.7} />
      </mesh>
      <mesh position={[18.0, 0.261, -7.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.2, 3.0]} />
        <meshStandardMaterial color="#DFC8A5" roughness={0.7} />
      </mesh>
      <mesh position={[8.0, 0.261, -2.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.0, 1.8]} />
        <meshStandardMaterial color="#DFC8A5" roughness={0.7} />
      </mesh>

      {/* South-West Stalls (Concord RE-06 & Rangs RE-05 & Food FD-01 & FD-03) */}
      <mesh position={[-8.0, 0.261, 7.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.2, 3.0]} />
        <meshStandardMaterial color="#DFC8A5" roughness={0.7} />
      </mesh>
      <mesh position={[-18.0, 0.261, 7.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.2, 3.0]} />
        <meshStandardMaterial color="#DFC8A5" roughness={0.7} />
      </mesh>
      <mesh position={[-8.0, 0.261, 3.0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.0, 1.8]} />
        <meshStandardMaterial color="#DFC8A5" roughness={0.7} />
      </mesh>
      <mesh position={[-8.0, 0.261, 15.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.0, 2.8]} />
        <meshStandardMaterial color="#DFC8A5" roughness={0.7} />
      </mesh>

      {/* South-East Stalls (Assure RE-07 & Bay RE-08 & Food FD-02 & FD-04) */}
      <mesh position={[8.0, 0.261, 7.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.2, 3.0]} />
        <meshStandardMaterial color="#DFC8A5" roughness={0.7} />
      </mesh>
      <mesh position={[18.0, 0.261, 7.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.2, 3.0]} />
        <meshStandardMaterial color="#DFC8A5" roughness={0.7} />
      </mesh>
      <mesh position={[8.0, 0.261, 3.0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.0, 1.8]} />
        <meshStandardMaterial color="#DFC8A5" roughness={0.7} />
      </mesh>
      <mesh position={[8.0, 0.261, 15.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.0, 2.8]} />
        <meshStandardMaterial color="#DFC8A5" roughness={0.7} />
      </mesh>

      {/* Outer North & South Stalls Connectors */}
      <mesh position={[-18.0, 0.261, -15.0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.2, 2.5]} />
        <meshStandardMaterial color="#DFC8A5" roughness={0.7} />
      </mesh>
      <mesh position={[18.0, 0.261, -15.0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.2, 2.5]} />
        <meshStandardMaterial color="#DFC8A5" roughness={0.7} />
      </mesh>
      <mesh position={[-18.0, 0.261, 15.0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.2, 2.5]} />
        <meshStandardMaterial color="#DFC8A5" roughness={0.7} />
      </mesh>
      <mesh position={[18.0, 0.261, 15.0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.2, 2.5]} />
        <meshStandardMaterial color="#DFC8A5" roughness={0.7} />
      </mesh>

      {/* Attraction Pavements (Nagordola, Balloon booth, Baul stage) */}
      <mesh position={[-22.0, 0.261, -15.0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[4.0, 2.2]} />
        <meshStandardMaterial color="#DFC8A5" roughness={0.7} />
      </mesh>
      <mesh position={[22.0, 0.261, -15.0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[4.0, 2.2]} />
        <meshStandardMaterial color="#DFC8A5" roughness={0.7} />
      </mesh>
      <mesh position={[0.0, 0.261, -17.0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[3.2, 4.5]} />
        <meshStandardMaterial color="#DFC8A5" roughness={0.7} />
      </mesh>

      {/* Entrance Arch at South End */}
      <group position={[0, 0.25, 23.0]}>
        <mesh position={[-2.4, 1.4, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.25, 2.8, 8]} />
          <meshStandardMaterial color="#D84315" metalness={0.5} />
        </mesh>
        <mesh position={[2.4, 1.4, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.25, 2.8, 8]} />
          <meshStandardMaterial color="#D84315" metalness={0.5} />
        </mesh>
        <mesh position={[0, 2.8, 0]} castShadow>
          <boxGeometry args={[5.2, 0.7, 0.4]} />
          <meshStandardMaterial color="#FF5722" />
        </mesh>
        <Html position={[0, 2.8, 0.25]} center distanceFactor={18}>
          <div style={{
            backgroundColor: '#D84315',
            color: '#FFFFFF',
            padding: '4px 14px',
            borderRadius: 10,
            fontWeight: '900',
            fontSize: 10,
            letterSpacing: '1.2px',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            border: '1.5px solid #FFE082',
            boxShadow: '0 4px 14px rgba(0,0,0,0.5)',
          }}>
            EXPO MAIN ENTRANCE
          </div>
        </Html>
      </group>
    </group>
  );
}

// ---------------- VISITOR PATH SPECIFICATIONS ----------------

// Route 1: Luxury Real Estate Investor (Visits Shanta, Sheltech, Baul Stage, Fountain Ring)
const ROUTE_LUXURY_GULSHAN: Waypoint[] = [
  { pos: [0.9, 0.26, 21.0] },
  { pos: [0.9, 0.26, 4.8] },
  { pos: [3.8, 0.26, 2.5] }, // Detour smoothly around fountain
  { pos: [4.4, 0.26, 0.0] },
  { pos: [3.8, 0.26, -2.5] },
  { pos: [0.9, 0.26, -4.8] },
  { pos: [0.9, 0.26, -9.0] },
  { pos: [-6.0, 0.26, -9.0] },
  {
    pos: [-8.0, 0.26, -7.0],
    pauseDuration: 4.0,
    lookAt: [-8.0, 1.2, -9.0],
    actionLabel: '🏢 Touring Shanta Skyline',
  },
  { pos: [-6.0, 0.26, -9.0] },
  { pos: [0.0, 0.26, -9.0] },
  { pos: [6.0, 0.26, -9.0] },
  {
    pos: [8.0, 0.26, -7.0],
    pauseDuration: 3.5,
    lookAt: [8.0, 1.2, -9.0],
    actionLabel: '🏡 Browsing Sheltech Duplex',
  },
  { pos: [6.0, 0.26, -9.0] },
  { pos: [0.0, 0.26, -13.0] },
  {
    pos: [0.0, 0.26, -18.5],
    pauseDuration: 4.5,
    lookAt: [0.0, 1.5, -21.0],
    actionLabel: '🪘 Enjoying Baul Concert',
  },
  { pos: [-0.9, 0.26, -13.0] },
  { pos: [-0.9, 0.26, -4.8] },
  { pos: [-3.8, 0.26, -2.5] }, // Detour smoothly around fountain West
  { pos: [-4.4, 0.26, 0.0] },
  { pos: [-3.8, 0.26, 2.5] },
  { pos: [-0.9, 0.26, 4.8] },
  { pos: [-0.9, 0.26, 21.0] },
];

// Route 2: South Promenade Homebuyer (Visits Concord, Assure, Bay, Kacchi)
const ROUTE_SOUTH_AVENUE_INVESTOR: Waypoint[] = [
  { pos: [-0.9, 0.26, 21.0] },
  { pos: [-6.0, 0.26, 17.0] },
  {
    pos: [-8.0, 0.26, 15.2],
    pauseDuration: 3.0,
    lookAt: [-8.0, 1.0, 17.0],
    actionLabel: '🍲 Ordering Kacchi Kebab',
  },
  { pos: [-6.0, 0.26, 17.0] },
  { pos: [-0.9, 0.26, 13.0] },
  { pos: [-6.0, 0.26, 9.0] },
  {
    pos: [-8.0, 0.26, 7.0],
    pauseDuration: 4.0,
    lookAt: [-8.0, 1.2, 9.0],
    actionLabel: '🏢 Concord Towers Consultation',
  },
  { pos: [-6.0, 0.26, 9.0] },
  { pos: [0.0, 0.26, 9.0] },
  { pos: [6.0, 0.26, 9.0] },
  {
    pos: [8.0, 0.26, 7.0],
    pauseDuration: 3.5,
    lookAt: [8.0, 1.2, 9.0],
    actionLabel: '💎 Checking Assure Heights',
  },
  { pos: [14.0, 0.26, 9.0] },
  {
    pos: [18.0, 0.26, 7.0],
    pauseDuration: 4.0,
    lookAt: [18.0, 1.2, 9.0],
    actionLabel: '🌊 Bay Waterfront Residences',
  },
  { pos: [14.0, 0.26, 9.0] },
  { pos: [8.0, 0.26, 13.0] },
  {
    pos: [8.0, 0.26, 15.2],
    pauseDuration: 2.5,
    lookAt: [8.0, 1.0, 17.0],
    actionLabel: '☕ Having Masala Cha',
  },
  { pos: [0.9, 0.26, 19.0] },
];

// Route 3: Carnival & Smart Living Explorer (Visits Nagordola, Balloon Dart, bti, Navana)
const ROUTE_FESTIVAL_AMUSEMENT: Waypoint[] = [
  { pos: [-4.4, 0.26, 0.0] },
  {
    pos: [-8.0, 0.26, -2.0],
    pauseDuration: 3.0,
    lookAt: [-8.0, 1.0, -3.5],
    actionLabel: '🏺 Sonargaon Terracotta Demo',
  },
  { pos: [-14.0, 0.26, 0.0] },
  {
    pos: [-18.0, 0.26, -7.0],
    pauseDuration: 3.5,
    lookAt: [-18.0, 1.2, -9.0],
    actionLabel: '🌿 Navana Eco Balconies',
  },
  { pos: [-18.0, 0.26, -13.0] },
  {
    pos: [-22.0, 0.26, -14.5],
    pauseDuration: 5.0,
    lookAt: [-24.0, 3.0, -17.0],
    actionLabel: '🎡 Riding Nagordola Wheel',
  },
  { pos: [-14.0, 0.26, -13.0] },
  {
    pos: [-18.0, 0.26, -15.0],
    pauseDuration: 3.0,
    lookAt: [-18.0, 1.2, -17.0],
    actionLabel: '📐 Dom-Inno Architecture',
  },
  { pos: [-6.0, 0.26, -13.0] },
  { pos: [6.0, 0.26, -13.0] },
  { pos: [14.0, 0.26, -13.0] },
  {
    pos: [22.0, 0.26, -14.5],
    pauseDuration: 4.5,
    lookAt: [24.0, 1.5, -17.0],
    actionLabel: '🎯 Popping Carnival Balloons',
  },
  {
    pos: [18.0, 0.26, -15.0],
    pauseDuration: 3.5,
    lookAt: [18.0, 1.2, -17.0],
    actionLabel: '🏙️ Rupayan Gated Township',
  },
  {
    pos: [18.0, 0.26, -7.0],
    pauseDuration: 3.5,
    lookAt: [18.0, 1.2, -9.0],
    actionLabel: '⚡ Testing bti Smart Home',
  },
  { pos: [14.0, 0.26, 0.0] },
  { pos: [4.4, 0.26, 0.0] },
  { pos: [3.1, 0.26, 3.1] },
  { pos: [0.0, 0.26, 4.4] },
  { pos: [-3.1, 0.26, 3.1] },
];

// Route 4: Food Street & Craft Village Explorer (Visits Fuchka, Pitha, Jamdani, Fountain)
const ROUTE_FOOD_AND_CRAFT_STROLL: Waypoint[] = [
  { pos: [-0.9, 0.26, 16.0] },
  {
    pos: [-8.0, 0.26, 2.5],
    pauseDuration: 3.5,
    lookAt: [-8.0, 1.0, 4.0],
    actionLabel: '🌶️ Dhaka Tok Fuchka',
  },
  { pos: [-3.8, 0.26, 2.5] },
  {
    pos: [-4.4, 0.26, 0.0],
    pauseDuration: 2.5,
    lookAt: [0.0, 0.5, 0.0],
    actionLabel: '⛲ Watching Fountain Lights',
  },
  { pos: [-3.8, 0.26, -2.5] },
  { pos: [0.0, 0.26, -4.4] },
  { pos: [3.8, 0.26, -2.5] },
  {
    pos: [8.0, 0.26, -2.0],
    pauseDuration: 3.0,
    lookAt: [8.0, 1.0, -3.5],
    actionLabel: '🧵 Tangail Jamdani Weaving',
  },
  { pos: [4.4, 0.26, 0.0] },
  { pos: [3.8, 0.26, 2.5] },
  {
    pos: [8.0, 0.26, 2.5],
    pauseDuration: 3.5,
    lookAt: [8.0, 1.0, 4.0],
    actionLabel: '🥟 Hot Bhapa Pitha Tasting',
  },
  { pos: [0.9, 0.26, 8.0] },
];

// Route 5: Scenic Plaza Fountain Circular Walk (Exact Ring Walkway, Never in Water)
const ROUTE_PLAZA_CIRCULAR_PROMENADE: Waypoint[] = [
  { pos: [0.0, 0.26, 4.3] },
  { pos: [3.0, 0.26, 3.0] },
  { pos: [4.3, 0.26, 0.0] },
  { pos: [3.0, 0.26, -3.0] },
  { pos: [0.0, 0.26, -4.3] },
  { pos: [-3.0, 0.26, -3.0] },
  { pos: [-4.3, 0.26, 0.0] },
  { pos: [-3.0, 0.26, 3.0] },
];

// Route 6: Mega-Township & Outer Avenue Explorer (Suvastu, Rangs, Urban Design)
const ROUTE_OUTER_AVENUE_EXPLORER: Waypoint[] = [
  {
    pos: [-18.0, 0.26, 15.0],
    pauseDuration: 3.0,
    lookAt: [-18.0, 1.2, 17.0],
    actionLabel: '📐 Suvastu Eco Plans',
  },
  {
    pos: [-18.0, 0.26, 7.0],
    pauseDuration: 3.5,
    lookAt: [-18.0, 1.2, 9.0],
    actionLabel: '🏛️ Rangs Sculptural Penthouse',
  },
  { pos: [-14.0, 0.26, 0.0] },
  { pos: [-3.8, 0.26, 2.5] },
  { pos: [3.8, 0.26, 2.5] },
  { pos: [14.0, 0.26, 0.0] },
  {
    pos: [18.0, 0.26, 15.0],
    pauseDuration: 3.5,
    lookAt: [18.0, 1.2, 17.0],
    actionLabel: '🏢 Commercial Grade-A Suites',
  },
  { pos: [14.0, 0.26, 13.0] },
  { pos: [-14.0, 0.26, 13.0] },
];

function CameraPresetController({
  preset,
  controlsRef,
}: {
  preset: 'isometric' | 'birdsEye' | 'streetLevel' | 'nightMode';
  controlsRef: React.RefObject<any>;
}) {
  const { camera } = useThree();
  const targetCamPos = useRef(new THREE.Vector3(26, 32, 32));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const isTransitioning = useRef(true);

  useEffect(() => {
    isTransitioning.current = true;
    switch (preset) {
      case 'birdsEye':
        targetCamPos.current.set(0, 50, 2);
        targetLookAt.current.set(0, 0, -1);
        break;
      case 'streetLevel':
        targetCamPos.current.set(0, 3.2, 22);
        targetLookAt.current.set(0, 2.0, -8);
        break;
      case 'nightMode':
        targetCamPos.current.set(22, 20, 26);
        targetLookAt.current.set(0, 0.5, 0);
        break;
      case 'isometric':
      default:
        targetCamPos.current.set(26, 32, 32);
        targetLookAt.current.set(0, 0, 0);
        break;
    }
  }, [preset]);

  useFrame((_, delta) => {
    if (!isTransitioning.current) return;
    const step = Math.min(delta * 4.5, 0.25);
    camera.position.lerp(targetCamPos.current, step);
    if (controlsRef.current) {
      controlsRef.current.target.lerp(targetLookAt.current, step);
      controlsRef.current.update();
    }
    if (
      camera.position.distanceTo(targetCamPos.current) < 0.15 &&
      (!controlsRef.current || controlsRef.current.target.distanceTo(targetLookAt.current) < 0.15)
    ) {
      camera.position.copy(targetCamPos.current);
      if (controlsRef.current) {
        controlsRef.current.target.copy(targetLookAt.current);
        controlsRef.current.update();
      }
      isTransitioning.current = false;
    }
  });

  return null;
}

export function FairgroundScene3D({
  stalls,
  activeCategory,
  selectedStallId,
  onSelectStall,
  onSelectActivity,
  cameraPreset,
}: FairgroundScene3DProps) {
  const isNight = cameraPreset === 'nightMode';
  const controlsRef = useRef<any>(null);

  return (
    <View style={styles.canvasContainer}>
      <Canvas
        shadows
        camera={{ position: [26, 32, 32], fov: 50 }}
        style={styles.canvas}
      >
        <color attach="background" args={[isNight ? '#070D1E' : '#E8EFF5']} />
        <fog attach="fog" args={[isNight ? '#070D1E' : '#E8EFF5', 20, 95]} />

        <ambientLight intensity={isNight ? 0.38 : 0.88} color={isNight ? '#8CA8D0' : '#FFFFFF'} />
        <directionalLight
          position={[24, 36, 24]}
          intensity={isNight ? 0.45 : 1.5}
          color={isNight ? '#90CAF9' : '#FFF9E6'}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0001}
        />

        {isNight && (
          <>
            <pointLight position={[0, 9, 0]} intensity={2.5} color="#FFD54F" distance={38} />
            <pointLight position={[-20, 10, -15]} intensity={2.0} color="#FF80AB" distance={28} />
            <pointLight position={[20, 10, -15]} intensity={2.0} color="#00E5FF" distance={28} />
            <pointLight position={[0, 7, 15]} intensity={1.8} color="#FFB300" distance={25} />
          </>
        )}

        <pointLight position={[-18, 16, -18]} intensity={isNight ? 0.8 : 0.9} color="#FFE082" />

        <CameraPresetController preset={cameraPreset} controlsRef={controlsRef} />

        <OrbitControls
          ref={controlsRef}
          enableZoom={true}
          enablePan={true}
          minDistance={6}
          maxDistance={90}
          maxPolarAngle={Math.PI / 2.05}
          minPolarAngle={Math.PI / 12}
        />

        {/* 60x48 Spacious Ground Platform with Clear Roads */}
        <FairgroundTerrain />

        {/* Central Fountain */}
        <CentralFountain position={[0, 0.25, 0]} />

        {/* 1. ANIMATED NAGORDOLA (Far North-West Amusement Corner) */}
        <NagordolaWheel
          position={[-24.0, 0.25, -17.0]}
          onRide={() => onSelectActivity?.('Nagordola Wheel', 'Traditional Ferris Wheel Ride with panoramic spinning view of the fairground.')}
        />

        {/* 2. BALLOON DART SHOOTING (Far North-East Game Arcade) */}
        <BalloonDartBooth
          position={[24.0, 0.25, -17.0]}
          onPlay={() => onSelectActivity?.('Balloon Shooting', 'Pop colorful mela balloons to win Expo Spot Lucky Draw coupons!')}
        />

        {/* 3. LIVE BAUL & FOLK STAGE (North Terminus of Main Promenade) */}
        <BaulGaanStage
          position={[0.0, 0.25, -21.0]}
          onListen={() => onSelectActivity?.('Baul & Folk Stage', 'Live Bengali folk concerts, Ektara melodies, and celebrity talks.')}
        />

        {/* 4. MELA STREET FOOD STALLS (South Promenade Flanks) */}
        <MelaFoodStall
          position={[-8.0, 0.25, 4.0]}
          name="Dhaka Fuchka & Chotpoti"
          code="FD-01"
          color="#D84315"
          onTaste={() => onSelectActivity?.('Fuchka & Chotpoti Live Hub', 'Crispy spiced fuchka, tamarind tok, and hot chotpoti.')}
        />
        <MelaFoodStall
          position={[8.0, 0.25, 4.0]}
          name="Traditional Pitha Ghor"
          code="FD-02"
          color="#E65100"
          onTaste={() => onSelectActivity?.('Traditional Pitha Ghor', 'Steaming hot Bhapa, Chitoi, and Patishapta mela delicacies.')}
        />
        <MelaFoodStall
          position={[-8.0, 0.25, 17.0]}
          name="Old Dhaka Kacchi & Kebab"
          code="FD-03"
          color="#C2185B"
          onTaste={() => onSelectActivity?.('Old Dhaka Kacchi Hub', 'Authentic fragrant Basmati mutton kacchi & seekh kebabs.')}
        />
        <MelaFoodStall
          position={[8.0, 0.25, 17.0]}
          name="Spiced Cha & Jhalmuri"
          code="FD-04"
          color="#795548"
          onTaste={() => onSelectActivity?.('Spiced Cha & Jhalmuri', 'Clay-cup Masala tea and spicy mustard jhalmuri.')}
        />

        {/* 5. HERITAGE CRAFT & ARTISAN STALLS (Mid Flanks) */}
        <MelaCraftStall
          position={[-8.0, 0.25, -3.5]}
          name="Sonargaon Clay Pottery"
          code="CR-01"
          color="#8D6E63"
          onExplore={() => onSelectActivity?.('Sonargaon Pottery Booth', 'Traditional clay urns, terracotta crafts, and live pottery wheel.')}
        />
        <MelaCraftStall
          position={[8.0, 0.25, -3.5]}
          name="Tangail Jamdani Handloom"
          code="CR-02"
          color="#00897B"
          onExplore={() => onSelectActivity?.('Tangail Jamdani Pavilion', 'Authentic heritage handwoven textiles and live handloom demo.')}
        />

        {/* ANIMATED CALM STALL VISITORS (Follow exact paved paths & visit stalls) */}
        <StallVisitorWalker
          waypoints={ROUTE_LUXURY_GULSHAN}
          speed={1.05}
          shirtColor="#D95D45"
          pantsColor="#1E293B"
          startWaypointIndex={0}
        />
        <StallVisitorWalker
          waypoints={ROUTE_SOUTH_AVENUE_INVESTOR}
          speed={1.0}
          shirtColor="#00BCD4"
          pantsColor="#0F172A"
          startWaypointIndex={2}
        />
        <StallVisitorWalker
          waypoints={ROUTE_FESTIVAL_AMUSEMENT}
          speed={1.1}
          shirtColor="#FFD600"
          pantsColor="#334155"
          startWaypointIndex={0}
        />
        <StallVisitorWalker
          waypoints={ROUTE_FOOD_AND_CRAFT_STROLL}
          speed={0.95}
          shirtColor="#E040FB"
          pantsColor="#1E293B"
          startWaypointIndex={3}
        />
        <StallVisitorWalker
          waypoints={ROUTE_PLAZA_CIRCULAR_PROMENADE}
          speed={0.9}
          shirtColor="#00E676"
          pantsColor="#0F172A"
          startWaypointIndex={0}
        />
        <StallVisitorWalker
          waypoints={ROUTE_PLAZA_CIRCULAR_PROMENADE}
          speed={0.92}
          shirtColor="#FF6D00"
          pantsColor="#334155"
          startWaypointIndex={4}
        />
        <StallVisitorWalker
          waypoints={ROUTE_OUTER_AVENUE_EXPLORER}
          speed={1.0}
          shirtColor="#EC4899"
          pantsColor="#1E293B"
          startWaypointIndex={1}
        />

        {/* CROWD CLUSTERS AT ATTRACTIONS (Placed safely on paved gathering spots) */}
        <CrowdCluster position={[-21.0, 0.25, -14.5]} label="Nagordola Queue" />
        <CrowdCluster position={[21.0, 0.25, -14.5]} label="Balloon Game Fans" />
        <CrowdCluster position={[0.0, 0.25, -17.0]} label="Baul Music Audience" />
        <CrowdCluster position={[-5.8, 0.25, 4.0]} label="Fuchka Lovers" />
        <CrowdCluster position={[5.8, 0.25, 4.0]} label="Pitha Tasting" />
        <CrowdCluster position={[4.8, 0.26, 4.8]} label="Plaza Scenic View" />

        {/* 3D Trees on Lawn Plots */}
        <LowPolyTree position={[-26.0, 0.25, -9.0]} />
        <LowPolyTree position={[26.0, 0.25, -9.0]} />
        <LowPolyTree position={[-26.0, 0.25, 9.0]} />
        <LowPolyTree position={[26.0, 0.25, 9.0]} />
        <LowPolyTree position={[-13.0, 0.25, -17.0]} />
        <LowPolyTree position={[13.0, 0.25, -17.0]} />
        <LowPolyTree position={[-13.0, 0.25, 17.0]} />
        <LowPolyTree position={[13.0, 0.25, 17.0]} />
        <LowPolyTree position={[-27.0, 0.25, 0.0]} />
        <LowPolyTree position={[27.0, 0.25, 0.0]} />

        {/* Street Lamps along Promenades (Lining the Road Edges) */}
        <StreetLamp position={[-2.2, 0.25, -16.0]} />
        <StreetLamp position={[2.2, 0.25, -16.0]} />
        <StreetLamp position={[-2.2, 0.25, -6.0]} />
        <StreetLamp position={[2.2, 0.25, -6.0]} />
        <StreetLamp position={[-2.2, 0.25, 6.0]} />
        <StreetLamp position={[2.2, 0.25, 6.0]} />
        <StreetLamp position={[-2.2, 0.25, 16.0]} />
        <StreetLamp position={[2.2, 0.25, 16.0]} />

        <StreetLamp position={[-14.0, 0.25, -2.2]} />
        <StreetLamp position={[14.0, 0.25, -2.2]} />
        <StreetLamp position={[-14.0, 0.25, 2.2]} />
        <StreetLamp position={[14.0, 0.25, 2.2]} />

        {/* 12 Real Estate Developer Stalls (Realigned strictly OFF the roads!) */}
        {stalls.map((stall, idx) => {
          const isFilteredIn =
            activeCategory === 'All Stalls' || stall.category === activeCategory;
          const isSelected = selectedStallId === stall.id;

          return (
            <RealEstateStallMesh
              key={stall.id}
              stall={stall}
              stallIndex={idx}
              isFilteredIn={isFilteredIn}
              isSelected={isSelected}
              onSelect={onSelectStall}
            />
          );
        })}
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  canvasContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#0C1C24',
    borderRadius: 20,
    overflow: 'hidden',
  },
  canvas: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
