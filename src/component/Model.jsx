import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";

function NerdoModel(props) {
  const { nodes, materials } = useGLTF("/nerdo.glb");
  return (
    <group {...props} dispose={null} scale={0.05} rotation={[Math.PI/120, Math.PI / -2, 0]} >
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group rotation={[0, 0, 0.214]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.defaultMaterial_1.geometry}
              material={materials.Mat_Cuerpo}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.defaultMaterial_2.geometry}
              material={materials.Mat_Diente}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.defaultMaterial_3.geometry}
              material={materials.Mat_Cara}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.defaultMaterial_4.geometry}
              material={materials.Mat_Cara}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.defaultMaterial_5.geometry}
              material={materials.Mat_Anteojos}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial.geometry}
            material={materials.M_vidrio}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/nerdo.glb");

export default function Model(props) {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Canvas
        shadows
        camera={{ position: [0, 1.5, 2], fov: 50  }}
        style={{ borderRadius: "12px" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.7} castShadow />
        <NerdoModel {...props} />
        <OrbitControls enablePan={false} enableZoom={true} />
      </Canvas>
    </div>
  );
}
