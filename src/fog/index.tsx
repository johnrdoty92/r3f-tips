import {
 Canvas,
 useFrame,
 useLoader,
} from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import legoBatman from "../assets/LegoBatman.glb?url";
import { Suspense, useRef } from "react";
import { Environment } from "@react-three/drei";
import { MathUtils, Mesh } from "three";

//This work is based on "Lego Batman 3D Model ( From The Lego Batman)" (https://sketchfab.com/3d-models/lego-batman-3d-model-from-the-lego-batman-fe0de34081854108b3899bbcc4c42b4b) by Lego Mania (https://sketchfab.com/dankmememe) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
const LegoBatman = () => {
 const { scene } = useLoader(GLTFLoader, legoBatman);
 const ref = useRef<Mesh>(null!);

 useFrame(({ clock }) => {
  const wave =
   (Math.sin(clock.getElapsedTime() * 2) + 1) / 2;
  ref.current.position.z = wave * 2;
  ref.current.rotation.x = MathUtils.lerp(
   Math.PI / 5,
   0,
   wave,
  );
 });

 return (
  <>
   <fog attach="fog" args={["#212121", 3, 4]} />
   <color attach="background" args={["#212121"]} />
   <primitive
    ref={ref}
    position-y={-0.25}
    object={scene}
    scale={2}
   />
  </>
 );
};

const Fog = () => {
 return (
  <Canvas>
   <Suspense>
    <LegoBatman />
   </Suspense>
   <Environment preset="city" />
  </Canvas>
 );
};

export { Fog as Component };
