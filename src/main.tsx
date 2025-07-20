import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
 createBrowserRouter,
 RouterProvider,
} from "react-router";
import { routes } from "./routes.tsx";

const router = createBrowserRouter(routes, {
 basename: import.meta.env.DEV ? "/" : "/r3f-tips",
});

createRoot(document.getElementById("root")!).render(
 <StrictMode>
  <RouterProvider router={router} />
 </StrictMode>,
);
