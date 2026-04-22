import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, MeshDistortMaterial, Stars } from '@react-three/drei';

const AnimatedShape = ({ theme }) => {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.05;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.08;
    }
  });

  // Determine wireframe color based on theme
  let wireColor = "#ffffff";
  if (theme === 'light' || theme === 'red') wireColor = "#000000";
  if (theme === 'blue') wireColor = "#00f0ff";
  if (theme === 'green') wireColor = "#4ade80";

  return (
    <Icosahedron visible args={[1, 0]} scale={2.5} ref={meshRef}>
      <meshBasicMaterial color={wireColor} wireframe={true} transparent opacity={theme === 'light' ? 0.3 : 0.15} />
    </Icosahedron>
  );
};

const Background3D = ({ theme }) => {
  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        {theme !== 'light' && theme !== 'red' && <Stars radius={100} depth={50} count={1000} factor={2} saturation={0} fade speed={0.5} />}
        <AnimatedShape theme={theme} />
      </Canvas>
    </div>
  );
};

export default Background3D;
