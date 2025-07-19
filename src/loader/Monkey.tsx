import monkey from "../assets/Monkey.glb?url";
import {
 useFrame,
 useLoader,
} from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function Model({
 onProgress,
}: {
 onProgress: (percent: number) => void;
}) {
 const ref = useRef<Mesh>(null!);
 const { scene } = useLoader(
  GLTFLoader,
  monkey,
  undefined,
  (xhr) => onProgress(xhr.loaded / xhr.total),
 );

 useFrame((_, delta) => {
  ref.current.rotation.y += delta;
 });

 return (
  <primitive object={scene} ref={ref}>
   <meshStandardMaterial
    attach="children-0-material"
    color="#88ffd3"
   />
  </primitive>
 );
}
