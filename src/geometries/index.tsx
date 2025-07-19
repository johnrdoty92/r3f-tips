import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import {
 BoxGeometry,
 ConeGeometry,
 CylinderGeometry,
 DodecahedronGeometry,
 Group,
 Mesh,
 TorusGeometry,
} from "three";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

const geometryOptions = [
 "Box",
 "Cylinder",
 "Cone",
 "Torus",
 "Dodecahedron",
] as const;
type GeometryOption =
 (typeof geometryOptions)[number];

const geometryConfigs = {
 Box: {
  Geometry: BoxGeometry,
  args: [1, 1, 1, 1, 1, 1],
  keys: [
   "width",
   "height",
   "depth",
   "widthSegments",
   "heightSegments",
   "depthSegments",
  ],
 },
 Cylinder: {
  Geometry: CylinderGeometry,
  args: [1, 1, 1, 8, 1, false, 0, Math.PI * 2],
  keys: [
   "radiusTop",
   "radiusBottom",
   "height",
   "radialSegments",
   "heightSegments",
   "openEnded",
   "thetaStart",
   "thetaLength",
  ],
 },
 Cone: {
  Geometry: ConeGeometry,
  args: [1, 1, 8, 1, false, 0, Math.PI * 2],
  keys: [
   "radius",
   "height",
   "radialSegments",
   "heightSegments",
   "openEnded",
   "thetaStart",
   "thetaLength",
  ],
 },
 Torus: {
  Geometry: TorusGeometry,
  args: [1, 0.4, 12, 48, Math.PI * 2],
  keys: [
   "radius",
   "tube",
   "radialSegments",
   "tubularSegments",
   "arc",
  ],
 },
 Dodecahedron: {
  Geometry: DodecahedronGeometry,
  args: [1, 0],
  keys: ["radius", "detail"],
 },
} as const satisfies Record<GeometryOption, unknown>;

type Params = {
 geometry: GeometryOption;
 selected: any;
};

const params: Params = {
 geometry: "Box",
 selected: {},
};

const InteractiveMesh = () => {
 const groupRef = useRef<Group>(null!);
 const [geometry, setGeometry] =
  useState<GeometryOption>("Box");

 useEffect(() => {
  const gui = new GUI();
  gui
   .add(params, "geometry", geometryOptions)
   .onChange(setGeometry);
  const { Geometry, args, keys } =
   geometryConfigs[geometry];
  groupRef.current.children.forEach((mesh) => {
   (mesh as Mesh).geometry.dispose();
   (mesh as Mesh).geometry = new Geometry(
    ...(args as any),
   );
  });

  params.selected = Object.fromEntries(
   keys.map((key, i) => [key, args[i]]),
  );
  keys.forEach((key, i) => {
   gui
    .add(params.selected, key, args[i] as any)
    .onChange(() => {
     groupRef.current.children.forEach((mesh) => {
      (mesh as Mesh).geometry.dispose();
      (mesh as Mesh).geometry = new Geometry(
       ...(Object.values(params.selected) as any),
      );
     });
    });
  });

  return () => gui.destroy();
 }, [geometry]);

 useFrame((_, delta) => {
  groupRef.current.rotation.y += delta;
  groupRef.current.rotation.x += delta;
 });

 return (
  <group rotation-x={Math.PI / 5} ref={groupRef}>
   <mesh>
    <meshLambertMaterial color="purple" />
   </mesh>
   <mesh>
    <meshLambertMaterial wireframe color="white" />
   </mesh>
  </group>
 );
};

export const Geometries = () => {
 return (
  <Canvas>
   <directionalLight
    position={[2, 2, 5]}
    intensity={2}
   />
   <InteractiveMesh />
  </Canvas>
 );
};
