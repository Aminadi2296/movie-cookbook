import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: ".",  
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),  
        genre: resolve(__dirname, "genre.html"),  
        favorites: resolve(__dirname, "favorites.html"),  
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

      '/api': {
        target: 'https://api.spoonacular.com', 
        changeOrigin: true,  
        rewrite: (path) => path.replace(/^\/api/, ''), 
      },
    },
  },
});
