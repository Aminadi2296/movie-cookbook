// DOM Utilities
export function showLoader(containerId) {
    document.getElementById(containerId).innerHTML = `
      <div class="loader">Loading...</div>
    `;
  }
  
  export function showError(containerId, message = 'An error occurred') {
    document.getElementById(containerId).innerHTML = `
      <div class="error">
        ${message}
        <button onclick="window.location.reload()">Retry</button>
      </div>
    `;
  }
  
  // Navigation
  export function navigateToGenre(genreId) {
    window.location.href = `genre.html?type=${genreId}`;
  }