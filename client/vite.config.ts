import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      devOptions: {
        enabled: true,
      },
      registerType: "autoUpdate",
      manifest: {
        name: "Tick Tack Toe",
        short_name: "TickTackToeGame",
        description:
          "A real-time Tic-Tac-Toe game with seamless multiplayer functionality.",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "/screenshots/narrow.png",
            sizes: "427x759",
            type: "image/png",
            form_factor: "narrow",
          },
          {
            src: "screenshots/wide.png",
            sizes: "1910x883",
            type: "image/png",
            form_factor: "wide",
          },
        ],
      },
    }),
  ],
});
