import { initGenreNavigation } from './dynamicGenres.js';

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('genre-container')) {
    initGenreNavigation();
  }
});

// import { showLoader, showError, navigateToGenre } from './utils.js';
// import { fetchMoviesByGenre, getRecipeForMovie } from './api.js';


// console.log("Script loaded!");

// // Constants
// const GENRES = [
//   { id: 'animated', name: 'Animated', color: '#FEDB71' },
//   { id: 'action', name: 'Action', color: '#e74c3c' },
//   { id: 'romance', name: 'Romance', color: '#e91e63' },
//   { id: 'classic', name: 'Classic', color: '#389C9A' }
// ];

// // Initialize based on current page
// document.addEventListener('DOMContentLoaded', () => {
//   if (document.getElementById('genre-container')) {
//     initGenreNavigation();
//   } else if (document.getElementById('movies-container')) {
//     loadGenrePage();
//   }
// });

// function initGenreNavigation() {
//   const container = document.getElementById('genre-container');
//   container.innerHTML = GENRES.map(genre => `
//     <div class="genre-card" 
//          style="background: ${genre.color}"
//          onclick="navigateToGenre('${genre.id}')">
//       <h2>${genre.name}</h2>
//       <p>View recipes</p>
//     </div>
//   `).join('');
// }

// async function loadGenrePage() {
//   const container = document.getElementById('movies-container');
//   showLoader('movies-container');
  
//   try {
//     const genre = new URLSearchParams(window.location.search).get('type');
//     const movies = await fetchMoviesByGenre(genre);
    
//     container.innerHTML = movies.map(movie => `
//       <div class="movie-recipe-pair">
//         <div class="movie-card">
//           <img src="${movie.image}" alt="${movie.title}">
//           <h3>${movie.title}</h3>
//         </div>
//         <div class="recipe-placeholder" data-movie-id="${movie.id}">
//           Loading recipe...
//         </div>
//       </div>
//     `).join('');

//     // Load recipes async
//     movies.forEach(async movie => {
//       const recipe = await getRecipeForMovie(movie.title);
//       const placeholder = document.querySelector(`[data-movie-id="${movie.id}"]`);
//       placeholder.innerHTML = recipe ? `
//         <img src="${recipe.image}" alt="${recipe.title}">
//         <h4>${recipe.title}</h4>
//       ` : 'No recipe found';
//     });
//   } catch (error) {
//     showError('movies-container', 'Failed to load movies');
//   }
// }