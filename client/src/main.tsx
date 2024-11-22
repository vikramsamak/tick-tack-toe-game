import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { SocketProvider } from "./contexts/SocketContext";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SocketProvider>
      <RouterProvider
        router={routes}
        future={{
          v7_startTransition: true,
        }}
      />
    </SocketProvider>
  </StrictMode>
);
