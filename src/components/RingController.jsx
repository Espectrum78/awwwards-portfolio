import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import RingModel from "./RingModel";
import * as THREE from "three";

export default function RingController() {
  const group = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  // Movimiento del mouse
  const onPointerMove = (e) => {
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  };

  useFrame(() => {
    if (!group.current) return;

    // Ajuste suave
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      mouse.current.x * 0.5,
      0.08
    );

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      mouse.current.y * 0.3,
      0.08
    );
  });

  return (
    <group ref={group} onPointerMove={onPointerMove}>
      <RingModel scale={1} />
    </group>
  );
}
