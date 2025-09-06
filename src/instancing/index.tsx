import {
 Environment,
 OrbitControls,
 Stats,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useLayoutEffect, useRef } from "react";
import {
 InstancedMesh,
 Matrix4,
 Vector3,
 MathUtils,
 Color,
} from "three";
import {
 getRandomPosition,
 getRandomRotationMtx,
} from "../util/random";

const count = 1000;
const matrix = new Matrix4();
const temp = new Matrix4();
const position = new Vector3();

const color = new Color();
const getRandomColor = () => {
 return color.setHSL(
  MathUtils.lerp(0, 360, Math.random()),
  1,
  0.5,
 );
};

const Instances = () => {
 const instances = useRef<InstancedMesh>(null!);

 useLayoutEffect(() => {
  for (let i = 0; i < count; i++) {
   matrix.setPosition(getRandomPosition());
   matrix.multiply(getRandomRotationMtx());
   instances.current.setMatrixAt(i, matrix);
   instances.current.setColorAt(i, getRandomColor());
  }
 }, []);

 useFrame((_, delta) => {
  for (let i = 0; i < count; i++) {
   instances.current.getMatrixAt(i, matrix);
   position.setFromMatrixPosition(matrix);
   temp.makeRotationAxis(position.normalize(), delta);
   matrix.multiply(temp);
   instances.current.setMatrixAt(i, matrix);
  }
  instances.current.instanceMatrix.needsUpdate = true;
 });

 return (
  <instancedMesh
   ref={instances}
   args={[undefined, undefined, count]}
  >
   <torusGeometry />
   <meshStandardMaterial />
  </instancedMesh>
 );
};

const Instancing = () => {
 return (
  <Canvas camera={{ position: [0, 10, -15] }}>
   <Stats />
   <OrbitControls autoRotate />
   <Instances />
   <Environment
    environmentIntensity={0.5}
    preset="park"
    background
   />
  </Canvas>
 );
};

export { Instancing as Component };
