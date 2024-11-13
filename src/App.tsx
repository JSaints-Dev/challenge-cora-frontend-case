import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";

import "./app.css";
import { Toaster } from "react-hot-toast";

export function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}
