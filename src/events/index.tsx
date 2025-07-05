import {
  Canvas,
  type ThreeElements,
} from "@react-three/fiber";
import { useState } from "react";
import { CameraControls } from "@react-three/drei";

const Sphere = ({
  color,
  ...props
}: ThreeElements["mesh"] & { color: string }) => {
  const [focusColor, setFocusColor] = useState<
    string | undefined
  >();

  return (
    <mesh
      {...props}
      onClick={(e) => {
        e.stopPropagation();
        setFocusColor("pink");
      }}
      onPointerEnter={(e) => {
        e.stopPropagation();
        setFocusColor("blue");
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        setFocusColor(color);
      }}
    >
      <sphereGeometry />
      <meshStandardMaterial
        color={focusColor ?? color}
      />
    </mesh>
  );
};

export const Events = () => {
  return (
    <Canvas>
      <Sphere position-x={-2} color="red" />
      <Sphere color="yellow" />
      <Sphere position-x={2} color="green" />
      <directionalLight position-z={1} />
      <CameraControls />
    </Canvas>
  );
};
