import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Stars, Environment } from '@react-three/drei';
import * as THREE from 'three';

function Orb({ progress }) {
  const group = useRef();
  const mesh = useRef();
  useFrame((state, delta) => {
    const p = progress.current;
    if (group.current) {
      group.current.rotation.y += delta * 0.11;
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, p * 1.15, 0.04);
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, 0.12 - p * 0.75, 0.045);
      group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, p > 0.42 ? 1.45 : 0, 0.035);
      group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, p > 0.72 ? 0.72 : 1, 0.035));
    }
    if (mesh.current) mesh.current.rotation.z += delta * 0.08;
  });
  return (
    <group ref={group}>
      <Float speed={1.2} rotationIntensity={0.24} floatIntensity={0.42}>
        <mesh ref={mesh}>
          <icosahedronGeometry args={[1.35, 24]} />
          <MeshDistortMaterial color="#b9ff66" roughness={0.22} metalness={0.42} distort={0.28} speed={1.5} />
        </mesh>
        <mesh scale={1.11}>
          <icosahedronGeometry args={[1.35, 2]} />
          <meshBasicMaterial color="#d5ff9c" wireframe transparent opacity={0.15} />
        </mesh>
      </Float>
      <mesh rotation={[Math.PI / 2.6, 0.2, 0.2]} scale={[2.1, 2.1, 0.018]}>
        <torusGeometry args={[1, 0.006, 8, 180]} />
        <meshBasicMaterial color="#b9ff66" transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[0.4, 0.2, 0.7]} scale={[2.45, 2.45, 0.018]}>
        <torusGeometry args={[1, 0.004, 8, 180]} />
        <meshBasicMaterial color="#8c9a7b" transparent opacity={0.42} />
      </mesh>
    </group>
  );
}

export default function Scene({ progress }) {
  return (
    <div className="scene-wrap" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6.6], fov: 42 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.65} />
        <pointLight position={[4, 3, 4]} intensity={28} color="#c7ff89" />
        <pointLight position={[-4, -2, 1]} intensity={12} color="#6b83ff" />
        <Stars radius={35} depth={24} count={650} factor={1.1} saturation={0} fade speed={0.35} />
        <Orb progress={progress} />
        <Environment preset="city" />
      </Canvas>
      <div className="scene-vignette" />
    </div>
  );
}