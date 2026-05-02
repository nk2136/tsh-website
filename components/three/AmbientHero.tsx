"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  MeshTransmissionMaterial,
  TorusKnot,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";

function FoldedKnot() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.06;
    ref.current.rotation.y += delta * 0.12;
  });

  return (
    <Float speed={0.6} rotationIntensity={0.25} floatIntensity={0.6} floatingRange={[-0.05, 0.05]}>
      <mesh ref={ref} castShadow position={[0, 0, 0]} scale={1.05}>
        <torusKnotGeometry args={[1.05, 0.32, 220, 32, 2, 3]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={0.5}
          thickness={0.45}
          chromaticAberration={0.1}
          anisotropicBlur={0.6}
          distortion={0.15}
          distortionScale={0.6}
          temporalDistortion={0.15}
          ior={1.45}
          roughness={0.18}
          color="#C97A55"
          attenuationColor="#A85F3E"
          attenuationDistance={1.4}
          transmission={1}
        />
      </mesh>
    </Float>
  );
}

function AccentRing() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += delta * 0.05;
  });

  return (
    <mesh ref={ref} position={[0, 0, -1.5]} rotation={[0.4, 0.2, 0]}>
      <torusGeometry args={[2.4, 0.012, 16, 200]} />
      <meshBasicMaterial color="#7B8E68" transparent opacity={0.35} />
    </mesh>
  );
}

function Particles() {
  const points = useMemo(() => {
    const arr: THREE.Vector3[] = [];
    for (let i = 0; i < 32; i++) {
      arr.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 2 - 1
        )
      );
    }
    return arr;
  }, []);

  return (
    <group>
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.012, 6, 6]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? "#C97A55" : "#1B1B1B"}
            transparent
            opacity={0.35}
          />
        </mesh>
      ))}
    </group>
  );
}

export function AmbientHero() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 38 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[3, 4, 4]}
        intensity={1.6}
        color="#FAF7F2"
        castShadow
      />
      <directionalLight position={[-2, -1, 2]} intensity={0.5} color="#E0A589" />
      <Suspense fallback={null}>
        <FoldedKnot />
        <AccentRing />
        <Particles />
        <Environment preset="apartment" />
        <ContactShadows
          position={[0, -1.6, 0]}
          opacity={0.18}
          scale={6}
          blur={3.2}
          far={3}
          resolution={256}
          color="#1B1B1B"
        />
      </Suspense>
    </Canvas>
  );
}
