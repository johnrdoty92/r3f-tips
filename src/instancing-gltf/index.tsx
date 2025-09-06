import {
 Environment,
 OrbitControls,
 Stats,
} from "@react-three/drei";
import {
 Canvas,
 useFrame,
 useGraph,
 useLoader,
} from "@react-three/fiber";
import {
 Suspense,
 useLayoutEffect,
 useRef,
} from "react";
import {
 InstancedMesh,
 Matrix4,
 Vector3,
} from "three";
import banana from "../assets/Banana.glb?url";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {
 getRandomPosition,
 getRandomRotationMtx,
} from "../util/random";

const count = 1000;
const matrix = new Matrix4();
const temp = new Matrix4();
const position = new Vector3();

const Instances = () => {
 const result = useLoader(GLTFLoader, banana);
 const { materials, meshes } = useGraph(result.scene);
 const instances = useRef<InstancedMesh>(null!);

 useLayoutEffect(() => {
  for (let i = 0; i < count; i++) {
   matrix.setPosition(
    getRandomPosition(undefined, 10),
   );
   matrix.multiply(getRandomRotationMtx());
   instances.current.setMatrixAt(i, matrix);
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
  <>
   <instancedMesh
    ref={instances}
    args={[
     meshes.Banana.geometry,
     materials.Texture,
     count,
    ]}
   />
  </>
 );
};

const Instancing = () => {
 return (
  <Canvas>
   <Stats />
   <color attach="background" args={["#c9c9c9"]} />
   <OrbitControls autoRotate />
   <Environment
    preset="city"
    environmentIntensity={0.5}
   />
   <Suspense>
    <Instances />
   </Suspense>
  </Canvas>
 );
};

export { Instancing as Component };
