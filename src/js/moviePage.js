// src/js/moviePage.js

import { getRecipeForMovie } from './api.js';  // Import the function for fetching recipes
import moviesData from '../data/moviesWithDishes.json';  // Import your JSON data

// Function to fetch movie details by IMDb ID
async function fetchMovieDetails(imdbId) {
  // Find the movie in the JSON data based on IMDb ID
  const movie = Object.values(moviesData).flat().find(m => m.imdbId === imdbId);
  
  if (movie) {
    const { title, year, dish } = movie;
    
    // Set the movie title
    document.getElementById('movie-title').innerText = `${title} (${year})`;

    // Fetch recipe for the movie
    const recipe = await getRecipeForMovie(dish);

    if (recipe) {
      // Inject the recipe details into the page
      const recipeSection = document.getElementById('movie-container');
      recipeSection.innerHTML = `
        <h2>Recipe: ${dish}</h2>
        <img src="${recipe.image}" alt="${dish}" />
        <p>${recipe.title}</p>
        <a href="${recipe.sourceUrl}" target="_blank">View full recipe</a>
      `;
    } else {
      // Handle case where no recipe was found
      document.getElementById('movie-container').innerHTML = `<p>No recipe found for this movie.</p>`;
    }
  } else {
    document.getElementById('movie-title').innerText = 'Movie not found';
    document.getElementById('movie-container').innerHTML = '<p>Error: Movie not found in data.</p>';
  }
}

// Load the movie page by fetching movie details
export function loadMoviePage() {
  const urlParams = new URLSearchParams(window.location.search);
  const imdbId = urlParams.get('id');

  if (imdbId) {
    fetchMovieDetails(imdbId);
  } else {
    document.getElementById('movie-title').innerText = 'Movie not found';
    document.getElementById('movie-container').innerHTML = '<p>Error: No IMDb ID provided.</p>';
  }
}
