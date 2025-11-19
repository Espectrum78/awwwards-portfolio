// src/components/RingModel.jsx 
import React, { useRef, useEffect } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { useGLTF, useTexture, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

// -----------------------------------------
// SHADER — Distorsión suave
// -----------------------------------------
const InnerDistortionMaterial = shaderMaterial(
  { uTime: 0, uTexture: null },
  `
    varying vec2 vUv;
    uniform float uTime;

    void main() {
      vUv = uv;
      vec3 pos = position;

      pos.x += sin(uTime * 2.0 + uv.y * 4.0) * 0.02;
      pos.y += cos(uTime * 1.5 + uv.x * 4.0) * 0.02;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  `
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float uTime;

    void main() {
      vec2 uv = vUv;

      uv.x += sin(uv.y * 6.0 + uTime * 2.0) * 0.01;
      uv.y += cos(uv.x * 6.0 + uTime * 1.5) * 0.01;

      vec4 tex = texture2D(uTexture, uv);

      if (tex.a < 0.01) discard;

      gl_FragColor = tex;
    }
  `
);
extend({ InnerDistortionMaterial });

export default function RingModel({ scale = 1, innerImage = "/images/inner.png" }) {
  const groupRef = useRef(null);
  const planeRef = useRef(null);

  // Modelo 3D
  const { scene } = useGLTF("/models/ring.glb");

  // Textura interior
  const texture = useTexture(innerImage);
  texture.encoding = THREE.sRGBEncoding;
  texture.flipY = false;

  // 🔥 FIX DEL ESPEJO (no rompe nada)
  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.x = -1;
  texture.center.set(0.5, 0.5);

  const mouse = useRef({ x: 0, y: 0 });

  // Mouse global
  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Animación principal
  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const t = clock.getElapsedTime();

    const floatX = Math.sin(t * 1.2) * 0.15;
    const floatY = Math.cos(t * 1.5) * 0.2;
    const floatZ = Math.sin(t * 1.7) * 0.12;

    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      floatX + mouse.current.x * 0.4,
      0.06
    );

    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      floatY + mouse.current.y * 0.4,
      0.06
    );

    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      floatZ,
      0.06
    );

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouse.current.y * 0.5,
      0.07
    );

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouse.current.x * 0.8,
      0.07
    );

    if (planeRef.current?.material) {
      planeRef.current.material.uTime = t;
    }
  });

  return (
    <group
      ref={groupRef}
      scale={[1.4 * scale, 1.4 * scale, 1.4 * scale]}
      rotation={[Math.PI / 2, 0, 0]}
      castShadow
      receiveShadow
    >
      <primitive object={scene} castShadow receiveShadow />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <shadowMaterial opacity={0.35} />
      </mesh>

    <mesh
  ref={planeRef}
  position={[3, 4, 0.4]}
  rotation={[0, Math.PI, 3.1]}   // Apunta hacia adelante sin voltear UV
  scale={[-3, 3, 2]}             // Flip real del plano, NO de la textura
  renderOrder={10}
>
  <planeGeometry args={[3, 3]} />
  <innerDistortionMaterial
    uTexture={texture}
    transparent
  />
</mesh>


    </group>
  );
}

useGLTF.preload("/models/ring.glb");
