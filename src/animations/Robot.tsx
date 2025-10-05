import { useEffect, useRef } from "react";
import { type ThreeElements } from "@react-three/fiber";
import {
 useGLTF,
 useAnimations,
} from "@react-three/drei";
import { type GLTF } from "three-stdlib";
import robot from "../assets/RobotExpressive.glb?url";
import {
 Group,
 LoopOnce,
 type AnimationClip,
 type Bone,
 type Mesh,
 type MeshStandardMaterial,
 type SkinnedMesh,
} from "three";

type ActionName =
 | "Dance"
 | "Death"
 | "Idle"
 | "Jump"
 | "No"
 | "Punch"
 | "Running"
 | "Sitting"
 | "Standing"
 | "ThumbsUp"
 | "Walking"
 | "WalkJump"
 | "Wave"
 | "Yes";

const singleLoopActions = [
 "Death",
 "Sitting",
 "Standing",
 "Jump",
 "No",
 "Punch",
 "ThumbsUp",
 "Wave",
 "Yes",
];

type GLTFAction = AnimationClip & {
 name: ActionName;
};

type GLTFResult = GLTF & {
 nodes: {
  FootL_1: Mesh;
  LowerLegL_1: Mesh;
  LegL: Mesh;
  LowerLegR_1: Mesh;
  LegR: Mesh;
  Head_2: Mesh;
  Head_3: Mesh;
  Head_4: Mesh;
  ArmL: Mesh;
  ShoulderL_1: Mesh;
  ArmR: Mesh;
  ShoulderR_1: Mesh;
  Torso_2: Mesh;
  Torso_3: Mesh;
  FootR_1: Mesh;
  HandR_1: SkinnedMesh;
  HandR_2: SkinnedMesh;
  HandL_1: SkinnedMesh;
  HandL_2: SkinnedMesh;
  Bone: Bone;
 };
 materials: {
  Grey: MeshStandardMaterial;
  Main: MeshStandardMaterial;
  Black: MeshStandardMaterial;
 };
 animations: GLTFAction[];
};

export const Robot = (
 props: ThreeElements["group"],
) => {
 const group = useRef<Group>(null!);
 const { animations, nodes, materials } = useGLTF(
  robot,
 ) as unknown as GLTFResult;
 const { actions, names } = useAnimations(
  animations,
  group,
 );

 const index = useRef(0);

 useEffect(() => {
  actions[names[index.current]]?.play();
 }, []);

 const handleClick = () => {
  const prevAction = actions[names[index.current]];
  if (prevAction) {
   prevAction.fadeOut(0.5);
   index.current = (index.current + 1) % names.length;
  }
  const name = names[index.current];
  const action = actions[name];
  if (!action) return;
  if (singleLoopActions.includes(name)) {
   action.clampWhenFinished = true;
   action.loop = LoopOnce;
  }
  action.reset().fadeIn(0.5).play();
 };

 materials.Grey.metalness = 1;
 materials.Grey.roughness = 0.2;
 materials.Black.metalness = 0.75;
 materials.Black.roughness = 0.2;
 materials.Main.metalness = 0;
 materials.Main.roughness = 0.1;

 return (
  <group
   ref={group}
   {...props}
   dispose={null}
   onClick={handleClick}
  >
   <group name="Root_Scene">
    <group name="RootNode">
     <group
      name="RobotArmature"
      rotation={[-Math.PI / 2, 0, 0]}
      scale={100}
     >
      <primitive object={nodes.Bone} />
     </group>
     <group
      name="HandR"
      position={[-0.003, 2.37, -0.021]}
      rotation={[-Math.PI / 2, 0, 0]}
      scale={100}
     >
      <skinnedMesh
       name="HandR_1"
       geometry={nodes.HandR_1.geometry}
       material={materials.Main}
       skeleton={nodes.HandR_1.skeleton}
      />
      <skinnedMesh
       name="HandR_2"
       geometry={nodes.HandR_2.geometry}
       material={materials.Grey}
       skeleton={nodes.HandR_2.skeleton}
      />
     </group>
     <group
      name="HandL"
      position={[-0.003, 2.37, -0.021]}
      rotation={[-Math.PI / 2, 0, 0]}
      scale={100}
     >
      <skinnedMesh
       name="HandL_1"
       geometry={nodes.HandL_1.geometry}
       material={materials.Main}
       skeleton={nodes.HandL_1.skeleton}
      />
      <skinnedMesh
       name="HandL_2"
       geometry={nodes.HandL_2.geometry}
       material={materials.Grey}
       skeleton={nodes.HandL_2.skeleton}
      />
     </group>
    </group>
   </group>
  </group>
 );
};

useGLTF.preload("/RobotExpressive.glb");
