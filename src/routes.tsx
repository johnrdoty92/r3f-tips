import type { RouteObject } from "react-router";
import { Layout } from "./Layout";

export const routes = [
 {
  path: "/",
  element: <Layout />,
  children: [
   { path: "/", lazy: () => import("./App") },
   {
    path: "/quick-start",
    lazy: () => import("./quick-start"),
   },
   {
    path: "/events",
    lazy: () => import("./events"),
   },
   {
    path: "/camera-change",
    lazy: () => import("./camera-change"),
   },
   {
    path: "/loader",
    lazy: () => import("./loader"),
   },
   {
    path: "/materials",
    lazy: () => import("./materials"),
   },
   {
    path: "/geometries",
    lazy: () => import("./geometries"),
   },
   {
    path: "/shadows",
    lazy: () => import("./shadows"),
   },
   {
    path: "/ascii-effect",
    lazy: () => import("./ascii-effect"),
   },
   {
    path: "/scroll-animations",
    lazy: () => import("./scroll-animations"),
   },
   {
    path: "/environment-maps",
    lazy: () => import("./environment-maps"),
   },
   { path: "/fog", lazy: () => import("./fog") },
   {
    path: "/instancing",
    lazy: () => import("./instancing"),
   },
   {
    path: "/instancing-3d-models",
    lazy: () => import("./instancing-gltf"),
   },
  ],
 },
] as const satisfies RouteObject[];
