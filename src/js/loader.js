const loader = document.getElementById('loader');

export function showLoader() {
  loader.classList.add('loader--visible');
}

export function hideLoader() {
  loader.classList.remove('loader--visible');
}