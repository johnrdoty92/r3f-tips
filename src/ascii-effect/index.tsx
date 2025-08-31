import {
 Canvas,
 useFrame,
 useLoader,
} from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { WebGLRenderer, type Mesh } from "three";
import { AsciiEffect } from "three/examples/jsm/effects/AsciiEffect.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import monkey from "../assets/Monkey.glb?url";

const Model = () => {
 const ref = useRef<Mesh>(null!);
 const { scene } = useLoader(GLTFLoader, monkey);

 useFrame((_, delta) => {
  ref.current.rotation.y += delta;
 });

 return (
  <primitive
   object={scene}
   ref={ref}
   scale={2}
   rotation-x={-Math.PI / 8}
  >
   <meshStandardMaterial attach="children-0-material" />
  </primitive>
 );
};

const Ascii = () => {
 return (
  <Canvas
   gl={(defaultProps) => {
    const renderer = new WebGLRenderer(defaultProps);
    const effect = new AsciiEffect(
     renderer,
     undefined,
     { color: true },
    );
    effect.domElement.style.background = "black";
    renderer.domElement.parentElement!.append(
     effect.domElement,
    );
    renderer.domElement.style.display = "none";
    return {
     ...renderer,
     render: effect.render,
     setSize: effect.setSize,
    };
   }}
  >
   <directionalLight
    color="forestgreen"
    position={[-10, 5, 0]}
    intensity={10}
   />
   <directionalLight
    position={[0.5, 0.5, 5]}
    color="orange"
    intensity={0.125}
   />
   <directionalLight
    position={[5, 5, 0]}
    color="magenta"
    intensity={3}
   />
   <Suspense>
    <Model />
   </Suspense>
  </Canvas>
 );
};

export { Ascii as Component };
