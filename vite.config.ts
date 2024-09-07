import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwind from "tailwindcss";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwind()],
    },
  },
  resolve: {
    alias: {
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@utils/*": path.resolve(__dirname, "./src/utils/*"),
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react"],
          "react-dom": ["react-dom"],
          "react-router-dom": ["react-router-dom"],
          "firebase/firestore": ["firebase/firestore"],
        }
      }
    }
  }
});
