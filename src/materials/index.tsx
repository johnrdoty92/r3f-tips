import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import {
 Material,
 MeshBasicMaterial,
 MeshLambertMaterial,
 MeshPhongMaterial,
 MeshStandardMaterial,
 MeshToonMaterial,
 type Mesh,
 Color,
} from "three";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

const materialOptions = [
 "Basic",
 "Lambert",
 "Standard",
 "Phong",
 "Toon",
] as const;
type MaterialOption =
 (typeof materialOptions)[number];

const color = new Color("orange");
const specular = new Color("white");
const materials = {
 Basic: new MeshBasicMaterial({ color }),
 Lambert: new MeshLambertMaterial({ color }),
 Standard: new MeshStandardMaterial({ color }),
 Phong: new MeshPhongMaterial({
  color,
  specular,
 }),
 Toon: new MeshToonMaterial({ color }),
} as const satisfies Record<MaterialOption, Material>;

const params = {
 material: "Basic" as MaterialOption,
 transparent: false,
 flatShading: false,
 opacity: 1,
 shininess: 30,
 roughness: 1,
 metalness: 1,
};

const Model = () => {
 const ref = useRef<Mesh>(null!);

 useEffect(() => {
  const gui = new GUI();
  gui
   .add(params, "material", materialOptions)
   .onChange((material) => {
    gui.controllers.forEach((c) => {
     if (c.property === "material") return;
     const isDisabled = !(
      c.property in materials[material]
     );
     c.disable(isDisabled);
    });
   });
  gui.add(params, "transparent");
  gui.add(params, "opacity", 0, 1, 0.01);
  gui.add(params, "flatShading").disable();
  gui.add(params, "roughness", 0, 1, 0.01).disable();
  gui.add(params, "metalness", 0, 1, 0.01).disable();
  gui.add(params, "shininess", 0, 128).disable();

  return () => {
   gui.destroy();
  };
 }, []);

 useFrame((_, delta) => {
  ref.current.rotation.y += delta;
  const { material, ...props } = params;
  ref.current.material = materials[material];
  Object.assign(ref.current.material, props);
  ref.current.material.needsUpdate = true;
 });

 return (
  <mesh ref={ref} material={materials.Basic}>
   <torusKnotGeometry args={[0.5, 0.125]} />
  </mesh>
 );
};

export const Materials = () => {
 return (
  <Canvas camera={{ position: [0, 0, 2.5] }}>
   <directionalLight
    position={[3, 1, 2]}
    intensity={2}
   />
   <Suspense>
    <Model />
   </Suspense>
  </Canvas>
 );
};
