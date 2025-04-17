import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Instances, Instance, OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Grid for the cyberpunk cityscape
const CyberGrid = () => {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame(({ clock }) => {
    if (gridRef.current) {
      gridRef.current.position.z = (clock.getElapsedTime() * 0.15) % 1;
    }
  });

  return (
    <>
      <gridHelper
        ref={gridRef}
        args={[30, 10, '#BD00FF', '#00F0FF']}
        position={[0, -5, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <gridHelper
        args={[30, 10, '#BD00FF', '#BD00FF']}
        position={[0, -10, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </>
  );
};

// Neon buildings in the background
const NeonBuildings = () => {
  const buildings = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 30; i++) {
      const position = [
        THREE.MathUtils.randFloatSpread(60) - 10,
        THREE.MathUtils.randFloatSpread(10) - 15,
        THREE.MathUtils.randFloat(-20, -10)
      ];
      const height = THREE.MathUtils.randFloat(1, 5);
      const width = THREE.MathUtils.randFloat(0.5, 1.5);
      const depth = THREE.MathUtils.randFloat(0.5, 1.5);

      // Choose a color
      const colorIndex = Math.floor(Math.random() * 3);
      const colors = ['#00F0FF', '#BD00FF', '#FF00FF'];
      const color = colors[colorIndex];

      temp.push({ position, height, width, depth, color });
    }
    return temp;
  }, []);

  return (
    <Instances limit={30}>
      <boxGeometry />
      <meshStandardMaterial />
      {buildings.map((building, i) => (
        <Building key={i} {...building} />
      ))}
    </Instances>
  );
};

const Building = ({ position, height, width, depth, color }: any) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ref.current) {
      // Make the buildings glow slightly
      const pulseFactor = Math.sin(Date.now() * 0.001) * 0.1 + 0.9;
      if (ref.current.material) {
        (ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulseFactor;
      }
    }
  });

  return (
    <Instance
      ref={ref}
      position={position}
      scale={[width, height, depth]}
    >
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1}
        toneMapped={false}
      />
    </Instance>
  );
};

// Floating particles
const Particles = () => {
  const particlesRef = useRef<THREE.Points>(null);

  const particleCount = 500;
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = THREE.MathUtils.randFloatSpread(50);
      positions[i * 3 + 1] = THREE.MathUtils.randFloatSpread(50);
      positions[i * 3 + 2] = THREE.MathUtils.randFloatSpread(50);
    }
    return positions;
  }, []);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      particlesRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.025) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#00F0FF"
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  );
};

// Main component
const CyberBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#0D0D0D']} />
        <ambientLight intensity={0.2} />
        <CyberGrid />
        <NeonBuildings />
        <Particles />
        <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  );
};

export default CyberBackground; 