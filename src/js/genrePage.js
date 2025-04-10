// src/js/genrePage.js

console.log('genrePage.js loaded');  // Ensure the file is loading

export async function loadGenrePage() {
  console.log('loadGenrePage function is running');  // Check if the function is running

  try {
    // Get the genre from the URL (for example, ?type=action)
    const genre = new URLSearchParams(window.location.search).get('type');
    console.log('Selected Genre:', genre);  // Check the selected genre

    if (!genre) {
      console.error('No genre found in URL');
      return window.location.href = '/';  // Redirect if no genre found
    }

    // Check if the page-title element exists and update the content
    const pageTitleElement = document.getElementById('page-title');
    if (pageTitleElement) {
      console.log('Page title element found:', pageTitleElement);  // Ensure the element exists
      pageTitleElement.textContent = `${genre.charAt(0).toUpperCase() + genre.slice(1)} Movies`;  // Update title
    } else {
      console.error('Page title element not found!');
    }

    // Dynamically update the browser tab title as well
    document.title = `${genre.charAt(0).toUpperCase() + genre.slice(1)} Movies`;
    console.log('Browser tab title updated to:', document.title);  // Log the new tab title

    // Fetch movies for the genre (make sure api.js is working correctly)
    const movies = await fetchMoviesByGenre(genre);  // Using the existing fetch function
    console.log('Fetched Movies:', movies);

    // If no movies are found, display a message
    const moviesContainer = document.getElementById('movies-container');
    if (movies.length === 0) {
      moviesContainer.innerHTML = 'No movies found for this genre.';
      return;
    }

    // Display the movies
    moviesContainer.innerHTML = movies
      .map(movie => {
        console.log('Movie Data:', movie);
        return `
          <div class="movie">
            <h3>${movie.title} (${movie.year})</h3>
            <img src="${movie.image}" alt="${movie.title}" />
          </div>
        `;
      })
      .join('');
  } catch (error) {
    console.error('Error loading genre page:', error);
  }
}

// Fetch movies by genre from the API
async function fetchMoviesByGenre(genre) {
  const apiUrl = `https://imdb.iamidiotareyoutoo.com/search?q=${genre}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.ok && Array.isArray(data.description)) {
      return data.description.map(item => ({
        title: item['#TITLE'] || 'No Title',
        image: item['#IMG_POSTER'] || 'path/to/fallback-image.jpg',
        year: item['#YEAR'] || 'No Year',
        imdbId: item['#IMDB_ID']
      }));
    } else {
      console.error('Error fetching movie data:', data.error_code);
      return [];
    }
  } catch (error) {
    console.error('Error fetching movies from API:', error);
    return [];
  }
}
