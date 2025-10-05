import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Robot } from "./Robot";
import {
 Environment,
 OrbitControls,
} from "@react-three/drei";

const Animations = () => {
 return (
  <Canvas>
   <Suspense>
    <Environment preset="city" />
    <Robot position-y={-2} />
    <OrbitControls autoRotate />
   </Suspense>
  </Canvas>
 );
};

export { Animations as Component };
