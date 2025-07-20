import { OrbitControls } from "@react-three/drei";
import {
 Canvas,
 useFrame,
 useThree,
 type ThreeElements,
} from "@react-three/fiber";
import { useEffect, useRef } from "react";
import {
 DirectionalLight,
 DirectionalLightHelper,
 Mesh,
} from "three";

const Cube = (props: ThreeElements["mesh"]) => {
 const meshRef = useRef<Mesh>(null!);
 const time = useRef(0);

 useFrame((_, delta) => {
  time.current += delta;
  meshRef.current.position.set(
   Math.sin(time.current) * 2,
   Math.abs(Math.sin(time.current * 2)) * 2,
   Math.cos(time.current) * 2,
  );
  meshRef.current.rotation.y += delta;
  meshRef.current.rotation.z -= delta;
 });

 return (
  <mesh ref={meshRef} {...props}>
   <meshStandardMaterial color="magenta" />
   <boxGeometry />
  </mesh>
 );
};

const Light = (
 props: ThreeElements["directionalLight"],
) => {
 const light = useRef<DirectionalLight>(null!);
 const { scene } = useThree();

 useEffect(() => {
  const lightHelper = new DirectionalLightHelper(
   light.current,
  );
  scene.add(lightHelper);
  return () => {
   scene.remove(lightHelper);
  };
 }, [scene]);

 return (
  <directionalLight
   ref={light}
   intensity={1}
   position-y={3}
   {...props}
  />
 );
};

const Floor = (props: ThreeElements["mesh"]) => {
 return (
  <mesh
   rotation-x={-Math.PI / 2}
   position-y={-0.5}
   {...props}
  >
   <planeGeometry args={[10, 10]} />
   <meshStandardMaterial color="orange" />
  </mesh>
 );
};

export const Shadows = () => {
 return (
  <Canvas shadows camera={{ position: [0, 5, 5] }}>
   <Light castShadow />
   <Cube castShadow />
   <Floor receiveShadow />
   <OrbitControls />
  </Canvas>
 );
};
