import {
 Canvas,
 useFrame,
 useLoader,
 useThree,
} from "@react-three/fiber";
import {
 Suspense,
 useLayoutEffect,
 useRef,
} from "react";
import {
 EquirectangularReflectionMapping,
 Mesh,
} from "three";
import hdri from "../assets/hamburg_canal_1k.hdr?url";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { OrbitControls } from "@react-three/drei";

const Environment = () => {
 const texture = useLoader(RGBELoader, hdri);
 const { scene } = useThree();

 useLayoutEffect(() => {
  texture.mapping = EquirectangularReflectionMapping;
  scene.environment = texture;
  scene.background = texture;
  scene.environmentIntensity = 2;
 }, [scene, texture]);

 return <></>;
};

const Element = () => {
 const ref = useRef<Mesh>(null!);

 useFrame(({ clock }) => {
  ref.current.rotation.y += clock.getDelta();
 });

 return (
  <mesh ref={ref}>
   <dodecahedronGeometry />
   <meshStandardMaterial
    color="orange"
    roughness={0}
    metalness={1}
   />
  </mesh>
 );
};

const EnvironmentMaps = () => {
 return (
  <Canvas>
   <Element />
   <OrbitControls autoRotate />
   <Suspense>
    <Environment />
   </Suspense>
  </Canvas>
 );
};

export { EnvironmentMaps as Component };
