import {
 Canvas,
 useFrame,
 useLoader,
 type ThreeElements,
} from "@react-three/fiber";
import {
 Suspense,
 useRef,
 type ComponentProps,
} from "react";
import { Vector3, type Mesh } from "three";
import legoFigure from "../assets/LegoFigure.glb?url";
import stars from "../assets/stars.jpg?url";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Environment } from "@react-three/drei";

const ScrollHandler = (
 props: ComponentProps<"div">,
) => {
 return (
  <div
   style={{
    position: "fixed",
    inset: 0,
    overflowY: "scroll",
    zIndex: 1,
   }}
   {...props}
  >
   <div
    style={{
     width: "100%",
     height: `calc(100dvh * 2)`,
    }}
   />
  </div>
 );
};

const Background = () => {
 useFrame(({ scene }, delta) => {
  scene.backgroundRotation.x += delta / 10;
 });
 return (
  <Environment
   background
   files={stars} // Source: https://svs.gsfc.nasa.gov/vis/a000000/a004800/a004851/starmap_2020_4k_print.jpg
   environmentIntensity={20}
  />
 );
};

// "LEGO Space Dart I" (https://skfb.ly/6vItq) by HansWurschd is licensed under Creative Commons Attribution-NonCommercial (http://creativecommons.org/licenses/by-nc/4.0/).
const LegoFigure = (props: ThreeElements["mesh"]) => {
 const { scene } = useLoader(GLTFLoader, legoFigure);
 return <primitive object={scene} {...props} />;
};

const start = new Vector3(-1, 0, -2);
const end = new Vector3(0, 0, 2);
const startRotation = new Vector3(0, 0, 0);
const endRotation = new Vector3(
 Math.PI * 2,
 Math.PI / 4,
 0,
);

const ScrollAnimations = () => {
 const ref = useRef<Mesh>(null!);
 return (
  <>
   <ScrollHandler
    onScroll={(e) => {
     const { scrollTop } = e.target as HTMLElement;
     const alpha = scrollTop / window.innerHeight;
     const y = Math.sin(alpha * 0.6);
     ref.current.position
      .lerpVectors(start, end, alpha)
      .setY(y);
     ref.current.rotation.setFromVector3(
      new Vector3().lerpVectors(
       startRotation,
       endRotation,
       alpha,
      ),
     );
    }}
   />
   <Canvas camera={{ position: [0, 1, 3] }}>
    <Background />
    <Suspense>
     <LegoFigure ref={ref} position={start} />
    </Suspense>
   </Canvas>
  </>
 );
};

export { ScrollAnimations as Component };
