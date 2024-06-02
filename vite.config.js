import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Load environment variables based on the mode
  const env = loadEnv(mode, process.cwd(), "");

  return {
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
      "process.env.OCTOAI_TOKEN": JSON.stringify(env.OCTOAI_TOKEN),

      // By default, Vite doesn't include shims for NodeJS/
      // necessary for segment analytics lib to work
      global: {},
    },
  };
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
