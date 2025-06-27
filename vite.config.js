import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  base: "/",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        genre: resolve(__dirname, "genre.html"),
        favorites: resolve(__dirname, "favorites.html"),
        movie: resolve(__dirname, "movie.html"),
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src/js'),
    },
  },
  server: {
    base: "/",
    proxy: {

      '/api': {
        target: 'https://api.spoonacular.com', 
        changeOrigin: true,  
        rewrite: (path) => path.replace(/^\/api/, ''), 
      },
    },
  },
});
