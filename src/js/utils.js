export function loadPartials() {
  console.log('Loading partials...');
  // Load Header
  fetch('/partials/header.html')
    .then(response => response.text())
    .then(html => {
      document.querySelector('header').innerHTML = html;
      console.log('Header loaded');
    })
    .catch(error => console.error('Error loading header:', error));

  // Load Footer
  fetch('/partials/footer.html')
    .then(response => response.text())
    .then(html => {
      document.querySelector('footer').innerHTML = html;
      console.log('Footer loaded');
    })
    .catch(error => console.error('Error loading footer:', error));
}
