import { initGenreNavigation } from './dynamicGenres.js';  // Genre navigation logic
import { loadPartials } from './utils.js';  // Load the header/footer dynamically

loadPartials();  // Load the header and footer dynamically

console.log('main.js loaded');

// Run when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('genre-container')) {
    console.log('Initializing genre navigation');
    initGenreNavigation();  // Homepage: set up genre links
  }

  if (document.getElementById('movies-container')) {
    console.log('Loading genre page...');
    import('./genrePage.js').then(module => {
      module.loadGenrePage();  // Genre page: load selected genre
    });
  }
});
