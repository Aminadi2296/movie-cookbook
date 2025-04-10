// src/js/genrePage.js
console.log('genrePage.js loaded');

export async function loadGenrePage() {
  // Get the genre from the URL
  const genre = new URLSearchParams(window.location.search).get('type');
  console.log('Selected Genre:', genre);

  if (!genre) {
    // Redirect back if no genre is provided
    return window.location.href = '/';
  }

  // Display genre name in the title
  document.getElementById('page-title').textContent = `${genre.charAt(0).toUpperCase() + genre.slice(1)} Movies`;
}
