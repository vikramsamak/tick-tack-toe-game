import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { SocketProvider } from "./contexts/SocketContext";
import "./index.css";

const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SocketProvider serverUrl={SOCKET_SERVER_URL}>
      <RouterProvider router={routes} />
    </SocketProvider>
  </StrictMode>
);
