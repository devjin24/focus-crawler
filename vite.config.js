import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./", // 상대 경로로 빌드 (Electron에서 필요)
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  resolve: {
    alias: {
    //   "@": path.resolve(__dirname, "./src"),
    //   "@components": path.resolve(__dirname, "./src/components"),
    //   "@assets": path.resolve(__dirname, "./src/assets"),
    },
  },
});
