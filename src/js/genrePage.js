console.log('genrePage.js loaded');

// src/js/genrePage.js
import { fetchMoviesByGenre, getRecipeForMovie } from './api.js'; 
import { showLoader, showError } from './utils.js';

export async function loadGenrePage() {
    console.log('loadGenrePage function is running');

  try {
    const container = document.getElementById('movies-container');
    
    // Show loader initially
    showLoader('movies-container');

    // Get the genre from the URL (for example, ?type=action)
    const genre = new URLSearchParams(window.location.search).get('type');
    console.log('Selected Genre:', genre);  // This should now work correctly!

    if (!genre) return window.location.href = '/'; // Fallback if no genre is specified

    // Set the page title dynamically based on the genre
    document.getElementById('page-title').textContent = 
      `${genre.charAt(0).toUpperCase() + genre.slice(1)} Movies`;

    // Fetch movies for the selected genre
    const movies = await fetchMoviesByGenre(genre);
    console.log('Fetched Movies:', movies);  // Log movies fetched

    // Render the movies and their recipes
    renderMoviesWithRecipes(movies);

  } catch (error) {
    console.error('Error loading genre page:', error);  // Log any errors here
    showError('movies-container', 'Failed to load movies');
  }
}

async function renderMoviesWithRecipes(movies) {
  const container = document.getElementById('movies-container');

  if (movies.length === 0) {
    container.innerHTML = '<p>No movies found for this genre.</p>';
    return;
  }

  // Generate HTML for each movie
  container.innerHTML = movies.map(movie => `
    <div class="movie-recipe-pair" data-movie-id="${movie.id}">
      <div class="movie-card">
        <img src="${movie.image}" alt="${movie.title}">
        <h3>${movie.title}</h3>
      </div>
      <div class="recipe-placeholder">Loading recipe...</div>
    </div>
  `).join('');

  // For each movie, load the recipe
  movies.forEach(async movie => {
    const recipe = await getRecipeForMovie(movie.title);
    const recipePlaceholder = document.querySelector(`[data-movie-id="${movie.id}"] .recipe-placeholder`);

    recipePlaceholder.innerHTML = recipe ? ` 
      <img src="${recipe.image}" alt="${recipe.title}">
      <h4>${recipe.title}</h4>
      <a href="/recipe.html?id=${recipe.id}" class="recipe-link">View Recipe</a>
    ` : 'No recipe found';
  });
}
