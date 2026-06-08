// vite.config.ts
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      host: "0.0.0.0",
      port: Number(env.FRONT_PORT) || 5173,
      watch: {
        usePolling: true,
        interval: 300,
      },
      proxy: {
        '/api/v1/recommendations': {
          target: 'https://iceberg-api-ywds.onrender.com/',
          changeOrigin: true,
          rewrite: (path) => path,
        },
        "/api": {
          target: env.VITE_API_URL || "http://aupa-server:3000",
          changeOrigin: true,
        },
      },
    },
  };
});