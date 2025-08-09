import App from "./App";
import { Ascii } from "./ascii-effect";
import { CameraChange } from "./camera-change";
import { EnvironmentMaps } from "./environment-maps";
import { Events } from "./events";
import { Fog } from "./fog";
import { Geometries } from "./geometries";
import { Loader } from "./loader";
import { Materials } from "./materials";
import { QuickStart } from "./quick-start";
import { ScrollAnimations } from "./scroll-animations";
import { Shadows } from "./shadows";

export const routes = [
 { path: "/", element: <App /> },
 { path: "/quick-start", element: <QuickStart /> },
 { path: "/events", element: <Events /> },
 {
  path: "/camera-change",
  element: <CameraChange />,
 },
 { path: "/loader", element: <Loader /> },
 { path: "/materials", element: <Materials /> },
 { path: "/geometries", element: <Geometries /> },
 { path: "/shadows", element: <Shadows /> },
 { path: "/ascii-effect", element: <Ascii /> },
 {
  path: "/scroll-animations",
  element: <ScrollAnimations />,
 },
 {
  path: "/environment-maps",
  element: <EnvironmentMaps />,
 },
 { path: "/fog", element: <Fog /> },
];
