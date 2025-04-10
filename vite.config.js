import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: ".",  // Root is the project root (this is already the default)
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),  // Main entry point for index.html
        genre: resolve(__dirname, "genre.html"),  // Genre HTML now in the root directory
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src/js'),
    },
  },
  server: {
    proxy: {
      // Proxy requests to Spoonacular API
      '/api': {
        target: 'https://api.spoonacular.com', // The Spoonacular API URL
        changeOrigin: true,  // Make the request appear as coming from the same origin
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove /api from the request path
      },
    },
  },
});
