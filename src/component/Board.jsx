import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";

function Tile({ position, emoji, onClick, color = "white" }) {
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
          color={color}
          anchorX="center"
          anchorY="middle"
        >
          {emoji}
        </Text>
      )}
    </group>
  );
}

export default function Board({
  tiles,
  onclick,
  p1color = "red",
  p2color = "blue",
  squares,
}) {
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
    <div className="w-90 h-80 mx-auto flex justify-center">
      <Canvas shadows camera={{ position: [3, 3, 3], fov: 50 }}  className="w-full h-full block">
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.7} castShadow />

        {tiles.map((emoji, idx) => {
          const mark = squares[idx];
          const color =
            mark === "X" ? p1color : mark === "O" ? p2color : "white";

          return (
            <Tile
              key={idx}
              position={positions[idx]}
              emoji={emoji}
              onClick={() => onclick(idx)}
              color={color}
            />
          );
        })}

        <OrbitControls />
      </Canvas>
    </div>
  );
}
