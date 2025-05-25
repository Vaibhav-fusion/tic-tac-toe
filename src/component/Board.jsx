import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";

function Tile({ position, emoji, onClick }) {
  const ref = useRef();
  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.005;
  });

  return (
    <group
      position={position}
      onClick={onClick}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "default")}
    >
      <mesh ref={ref} castShadow receiveShadow>
        <boxGeometry args={[1, 0.1, 1]} />
        <meshStandardMaterial color="#4fd1c5" roughness={0.1} metalness={0.9} />
      </mesh>

      {emoji && (
        <Text
          position={[0, 0.6, 0]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {emoji}
        </Text>
      )}
    </group>
  );
}

export default function Board({ tiles, onclick }) {
  const positions = [
    [-1.4, 0, 1.4],
    [0, 0, 1.4],
    [1.4, 0, 1.4],
    [-1.4, 0, 0],
    [0, 0, 0],
    [1.4, 0, 0],
    [-1.4, 0, -1.4],
    [0, 0, -1.4],
    [1.4, 0, -1.4],
  ];

  return (
    <div className="w-[400px] h-[400px] mx-auto rounded-lg overflow-hidden bg-[#e0f7fa]">
      <Canvas
        shadows
        camera={{ position: [3, 3, 3], fov: 50 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.7} castShadow />

        {tiles.map((emoji, idx) => (
          <Tile
            key={idx}
            position={positions[idx]}
            emoji={emoji}
            onClick={() => onclick(idx)}
          />
        ))}

        <OrbitControls />
      </Canvas>
    </div>
  );
}
