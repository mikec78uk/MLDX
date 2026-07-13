"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Bounds,
  Center,
  ContactShadows,
  Environment,
  OrbitControls,
  useBounds,
} from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import type { Group } from "three";
import { withBasePath } from "@/lib/basePath";

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.5/");

/**
 * Stand-in for a real vehicle model. Swap the geometry below for a glTF of
 * the actual car (via useGLTF) once model-specific assets are available —
 * the Canvas/lighting/controls rig around it stays the same.
 */
function PlaceholderVehicle({ accent }: { accent: string }) {
  return (
    <group position={[0, -0.4, 0]}>
      <mesh castShadow position={[0, 0.5, 0]}>
        <boxGeometry args={[2.6, 0.7, 1.1]} />
        <meshStandardMaterial color={accent} roughness={0.35} metalness={0.4} />
      </mesh>
      <mesh castShadow position={[-0.2, 0.95, 0]}>
        <boxGeometry args={[1.3, 0.5, 1]} />
        <meshStandardMaterial color={accent} roughness={0.35} metalness={0.4} />
      </mesh>
      {[
        [-0.9, 0.15, 0.6],
        [0.9, 0.15, 0.6],
        [-0.9, 0.15, -0.6],
        [0.9, 0.15, -0.6],
      ].map((position, index) => (
        <mesh
          key={index}
          castShadow
          position={position as [number, number, number]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.32, 0.32, 0.28, 24]} />
          <meshStandardMaterial color="#141414" roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

/** Real vehicle glTF, centered regardless of its source pivot/scale. */
function LoadedVehicle({ url }: { url: string }) {
  const [scene, setScene] = useState<Group | null>(null);
  const bounds = useBounds();

  useEffect(() => {
    let cancelled = false;
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.load(withBasePath(url), (gltf) => {
      if (!cancelled) setScene(gltf.scene);
    });
    return () => {
      cancelled = true;
    };
  }, [url]);

  useEffect(() => {
    // Bounds' initial fit happens before this async load resolves, so it
    // frames an empty box — refit once the model is actually in the scene.
    if (scene) bounds.refresh().fit();
  }, [scene, bounds]);

  if (!scene) return null;

  return (
    <Center>
      <primitive object={scene} />
    </Center>
  );
}

export function ModelViewer({
  accent = "#8a7256",
  modelUrl,
}: {
  accent?: string;
  modelUrl?: string;
}) {
  return (
    <div className="h-[420px] w-full overflow-hidden rounded-sm bg-[var(--color-paper-muted)] sm:h-[520px]">
      <Canvas shadows camera={{ position: [3.5, 1.8, 4], fov: 40 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[4, 6, 4]} intensity={1.4} castShadow />
          {/* Bounds re-frames the camera to fit whatever's loaded, since a
              real glTF's scale/origin won't match the placeholder's. */}
          <Bounds fit clip observe margin={1.3}>
            {modelUrl ? (
              <LoadedVehicle url={modelUrl} />
            ) : (
              <PlaceholderVehicle accent={accent} />
            )}
          </Bounds>
          <ContactShadows position={[0, -0.75, 0]} opacity={0.5} scale={8} blur={2.4} far={2} />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls
          makeDefault
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={1.4}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2.1}
        />
      </Canvas>
    </div>
  );
}
