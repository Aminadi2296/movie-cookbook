import { initGenreNavigation } from './dynamicGenres.js';  
import { loadPartials } from './utils.js';  

loadPartials(); 

console.log('main.js loaded');

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('genre-container')) {
    console.log('Initializing genre navigation');
    initGenreNavigation();  
  }

  if (document.getElementById('movies-container')) {
    console.log('Loading genre page...');
    import('./genrePage.js').then(module => {
      module.loadGenrePage();  
    });
  }
});
