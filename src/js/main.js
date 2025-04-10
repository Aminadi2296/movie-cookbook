// src/js/main.js
import { initGenreNavigation } from './dynamicGenres.js';  // Genre navigation logic

// Initialize genre navigation on the homepage (index.html)
if (document.getElementById('genre-container')) {
  initGenreNavigation();  // Initialize the genre cards on index.html
}

// Load the genre page if we're on genre.html
if (document.getElementById('movies-container')) {
  document.addEventListener('DOMContentLoaded', () => {
    import('./genrePage.js').then(module => {
      module.loadGenrePage();  // Dynamically load and call the genre page function
    });
  });
}
