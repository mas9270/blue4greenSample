"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

const Earth = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  const [scrollY, setScrollY] = useState(0);

  // گرفتن مقدار اسکرول
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // چرخش آرام با اسکرول
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y = scrollY * 0.0015;
      earthRef.current.rotation.x = scrollY * 0.0007;
    }
  });

  return (
    <Sphere ref={earthRef} args={[1, 64, 64]} scale={3}>
      <MeshDistortMaterial
        color="#9cd3ff"   // رنگ روشن و جذاب
        distort={0.25}    // تاب برداشتن جذاب
        speed={1.2}
        roughness={0.2}
        metalness={0.3}
      />
    </Sphere>
  );
};

export default function ViewEarth() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        background: "linear-gradient(180deg, #e4f3ff 0%, #b9dbff 100%)",
      }}
    >
      <Canvas camera={{ position: [0, 0, 5] }}>
        {/* نور نرم و روشن */}
        <ambientLight intensity={1.2} />
        <directionalLight intensity={1.4} position={[5, 5, 5]} />

        <Earth />
      </Canvas>
    </div>
  );
}
