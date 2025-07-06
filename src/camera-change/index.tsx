import { CameraControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import {
 OrthographicCamera,
 PerspectiveCamera,
} from "three";

const Cube = () => {
 const { set } = useThree();

 return (
  <mesh
   rotation={[Math.PI / 5, Math.PI / 4, 0]}
   onClick={() =>
    set(({ camera, size }) => {
     const { height, width } = size;
     if (camera instanceof OrthographicCamera) {
      const perspective = width / height;
      const newCamera = new PerspectiveCamera(
       75,
       perspective,
      );
      newCamera.zoom = 1;
      newCamera.filmGauge = 1;
      newCamera.updateProjectionMatrix();
      newCamera.position.setZ(5);
      return { camera: newCamera };
     } else {
      const newCamera = new OrthographicCamera(
       width / -2,
       width / 2,
       height / 2,
       height / -2,
       1,
       1000,
      );
      newCamera.zoom = 100;
      newCamera.position.setZ(5);
      newCamera.updateProjectionMatrix();
      return { camera: newCamera };
     }
    })
   }
  >
   <boxGeometry />
   <meshStandardMaterial color="cyan" />
  </mesh>
 );
};

export const CameraChange = () => {
 return (
  <Canvas>
   <Cube />
   <directionalLight intensity={2} position-z={1} />
   <directionalLight intensity={1} position-x={1} />
   <CameraControls />
  </Canvas>
 );
};
