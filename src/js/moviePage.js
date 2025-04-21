// src/js/moviePage.js

import { getRecipeForMovie } from './api.js';
import moviesData from '../data/moviesWithDishes.json';

// Function to fetch movie details by IMDb ID
async function fetchMovieDetails(imdbId) {
  const movie = Object.values(moviesData).flat().find(m => m.imdbId === imdbId);

  if (movie) {
    const { title, year, dish } = movie;

    // Set the movie title
    document.getElementById('movie-title').innerText = `${title} Recipes`;

    // Fetch multiple recipes (you can increase the number if your API allows)
    const recipes = await getRecipeForMovie(dish, 3);

    const container = document.getElementById('movie-container');
    container.innerHTML = '';

    if (recipes && recipes.length > 0) {
      recipes.forEach(recipe => {
        const card = createRecipeCard(recipe);
        container.appendChild(card);
      });
    } else {
      container.innerHTML = `<p>No recipe found for this movie.</p>`;
    }
  } else {
    document.getElementById('movie-title').innerText = 'Movie not found';
    document.getElementById('movie-container').innerHTML = '<p>Error: Movie not found in data.</p>';
  }
}

// Create a recipe card with Save to Favorites button
function createRecipeCard(recipe) {
  const card = document.createElement('div');
  card.classList.add('recipe-card');

  card.innerHTML = `
    <h2>${recipe.title}</h2>
    <img src="${recipe.image}" alt="${recipe.title}" />
    <p><a href="${recipe.sourceUrl}" target="_blank">View full recipe</a></p>
    <button class="save-favorite-btn">Save to Favorites</button>
  `;

  card.querySelector('.save-favorite-btn').addEventListener('click', () => {
    saveRecipeToFavorites(recipe);
  });

  return card;
}

// Save recipe to localStorage
function saveRecipeToFavorites(recipe) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  const exists = favorites.some(fav => fav.id === recipe.id);
  if (exists) {
    alert('Recipe already saved!');
    return;
  }

  favorites.push(recipe);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  alert('Recipe saved to favorites!');
}

// Entry point
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
