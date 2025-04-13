export async function loadPartials() {
  console.log('Loading partials...');
  try {
    // Load Header
    const headerResponse = await fetch('/partials/header.html');
    const headerHTML = await headerResponse.text();
    document.querySelector('header').innerHTML = headerHTML;
    console.log('Header loaded');

    // Load Footer
    const footerResponse = await fetch('/partials/footer.html');
    const footerHTML = await footerResponse.text();
    document.querySelector('footer').innerHTML = footerHTML;
    console.log('Footer loaded');
  } catch (error) {
    console.error('Error loading partials:', error);
  }
}
