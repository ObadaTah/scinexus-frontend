import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/ws": {
        target: "http://localhost:8080",
        secure: false,
        changeOrigin: true,
        ws: true, // Enable WebSocket proxying
      },
    },
  },
  plugins: [react()],
  define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
    global: {},
  },
});
// export default defineConfig({
//   server: {
//     proxy: {
//       "/ws": {
//         target: "http://localhost:8080",
//         changeOrigin: true,
//         ws: true, // Enable WebSocket proxying
//       },
//     },
//   },
//   plugins: [react()],
// });
