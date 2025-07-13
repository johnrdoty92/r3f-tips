import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { Model } from "./Monkey";

export const Loader = () => {
 const progressBar = useRef<HTMLDivElement>(null!);

 const handleProgressUpdate = (value: number) => {
  if (!progressBar.current) return;
  const progress = `${Math.floor(value * 100)}%`;
  progressBar.current.style.setProperty(
   "--progress",
   progress,
  );
  progressBar.current.setAttribute(
   "data-progress",
   progress,
  );
 };

 return (
  <>
   <div className="progress-bar" ref={progressBar}>
    <div></div>
   </div>
   <Canvas>
    <directionalLight
     intensity={1.5}
     position={[2, 1, 2]}
    />
    <Suspense>
     <Model onProgress={handleProgressUpdate} />
    </Suspense>
   </Canvas>
  </>
 );
};
