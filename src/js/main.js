import { initGenreNavigation } from './dynamicGenres.js';  
import { loadPartials } from './utils.js';  

// Load header and footer partials
loadPartials(); 

document.addEventListener('DOMContentLoaded', () => {
  // Initialize genre navigation if on genre page
  if (document.getElementById('genre-container')) {
    console.log('Initializing genre navigation');
    initGenreNavigation();  
  }

  // Load the genre page dynamically if on the movies container page
  if (document.getElementById('movies-container')) {
    console.log('Loading genre page...');
    import('./genrePage.js').then(module => {
      module.loadGenrePage();  
    });
  }
  
  // Load the movie page dynamically if on the movie container page
  if (document.getElementById('movie-container')) {
    import('./moviePage.js').then(module => {
      module.loadMoviePage();
    });
  }
});
