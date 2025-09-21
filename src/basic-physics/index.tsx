import {
 Canvas,
 useLoader,
} from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import {
 Physics,
 RapierRigidBody,
 RigidBody,
} from "@react-three/rapier";
import {
 Mesh,
 RepeatWrapping,
 TextureLoader,
} from "three";
import {
 CameraControls,
 Environment,
} from "@react-three/drei";
import basketBallModel from "../assets/basketball.glb?url";
import concreteDiffuse from "../assets/concrete_floor_01_diff_1k.jpg";
import concreteRough from "../assets/concrete_floor_01_rough_1k.jpg";
import concreteNormal from "../assets/concrete_floor_01_nor_gl_1k.exr?url";
import {
 EXRLoader,
 GLTFLoader,
} from "three/examples/jsm/Addons.js";

const BasketBall = () => {
 const ball = useRef<RapierRigidBody>(null);
 const basketBall = useLoader(
  GLTFLoader,
  basketBallModel,
 );

 useEffect(() => {
  basketBall.scene.traverse((object) => {
   if (object instanceof Mesh) {
    object.castShadow = true;
   }
  });
 }, [basketBall]);

 return (
  <RigidBody colliders="ball" ref={ball}>
   <primitive
    position-y={5}
    rotation={[0, Math.PI / 3, Math.PI / 2.5]}
    object={basketBall.scene}
    onClick={() => {
     if (!ball.current) return;
     ball.current.applyImpulse(
      {
       x: 0,
       y: 100,
       z: 0,
      },
      true,
     );
    }}
   />
  </RigidBody>
 );
};

const Concrete = () => {
 const [diff, rough] = useLoader(TextureLoader, [
  concreteDiffuse,
  concreteRough,
 ]);
 const normal = useLoader(EXRLoader, concreteNormal);

 useEffect(() => {
  diff.wrapS = RepeatWrapping;
  diff.wrapT = RepeatWrapping;
  diff.repeat.set(5, 5);
 }, [diff]);

 return (
  <RigidBody restitution={1}>
   <mesh receiveShadow rotation-x={-Math.PI / 2}>
    <meshStandardMaterial
     roughnessMap={rough}
     roughness={1}
     normalMap={normal}
     normalScale={1}
     map={diff}
    />
    <circleGeometry args={[20]} />
   </mesh>
  </RigidBody>
 );
};

const BasicPhysics = () => {
 return (
  <Canvas shadows camera={{ position: [0, 1, 5] }}>
   <CameraControls maxPolarAngle={Math.PI / 2.5} />
   <directionalLight castShadow />
   <Environment preset="park" background />
   <Suspense>
    <Physics gravity={[0, -80, 0]}>
     <BasketBall />
     <Concrete />
    </Physics>
   </Suspense>
  </Canvas>
 );
};

export { BasicPhysics as Component };
