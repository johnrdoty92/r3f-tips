import App from "./App";
import { CameraChange } from "./camera-change";
import { Events } from "./events";
import { Loader } from "./loader";
import { QuickStart } from "./quick-start";

export const routes = [
 { path: "/", element: <App /> },
 { path: "/quick-start", element: <QuickStart /> },
 { path: "/events", element: <Events /> },
 {
  path: "/camera-change",
  element: <CameraChange />,
 },
 { path: "/loader", element: <Loader /> },
];
