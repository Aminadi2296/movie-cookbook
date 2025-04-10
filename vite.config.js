import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"), // ✅ updated path
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src/js'),
    },
  },
});
