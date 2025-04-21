// favorites.js
import { loadPartials } from './utils.js';

loadPartials(); // Load header and footer

console.log('favorites.js loaded');

document.addEventListener('DOMContentLoaded', () => {
  const favoritesList = document.getElementById('favorites-container');

  // Get favorites from localStorage
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  if (favorites.length === 0) {
    favoritesList.innerHTML = '<p>No favorite recipes yet. Add some from the genre pages!</p>';
  } else {
    // Display each favorite recipe
    favoritesList.innerHTML = favorites.map(recipe => `
      <div class="favorite-recipe">
        <img src="${recipe.image}" alt="${recipe.title}" />
        <div class="recipe-details">
        <h3>${recipe.title}</h3>
        <div class="button-group">
        <a href="${recipe.url}" target="_blank">View Recipe</a>
        <button class="remove-favorite" data-id="${recipe.id}">Remove</button>
        </div>
        </div>
      </div>
    `).join('');

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-favorite').forEach(button => {
      button.addEventListener('click', (e) => {
        const recipeId = e.target.dataset.id;

        // Remove from favorites array
        const updatedFavorites = favorites.filter(recipe => recipe.id !== recipeId);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

        // Refresh the list
        e.target.closest('.favorite-recipe').remove();
        if (updatedFavorites.length === 0) {
          favoritesList.innerHTML = '<p>No favorite recipes yet. Add some from the genre pages!</p>';
        }
      });
    });
  }
});
