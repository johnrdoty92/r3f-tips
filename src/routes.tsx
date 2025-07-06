import App from "./App";
import { Events } from "./events";
import { QuickStart } from "./quick-start";

export const routes = [
 { path: "/", element: <App /> },
 { path: "/quick-start", element: <QuickStart /> },
 { path: "/events", element: <Events /> },
];
