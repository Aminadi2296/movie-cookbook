import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: ".",  // Set root to the project root (this is default behavior, but making it explicit can help)
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),   // Main entry point for index.html
        genre: resolve(__dirname, "src/genre.html"), // Explicitly define genre.html
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src/js'),
    },
  },
});
