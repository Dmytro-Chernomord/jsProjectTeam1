import refs from './refs.js';

function errorOn() {
  refs.error.classList.remove('visually-hidden');
}
function spinnerOff() {
  refs.spinner.classList.add('visually-hidden');
}
function spinnerOn() {
  refs.spinner.classList.remove('visually-hidden');
  refs.error.classList.add('visually-hidden');
}
function infoShow() {
  refs.info.classList.remove('visually-hidden');
  refs.watchedPaginationContainer.classList.add('is-none-pagination-library');
}

function infoHide() {
  refs.info.classList.add('visually-hidden');
  refs.watchedPaginationContainer.classList.remove(
    'is-none-pagination-library',
  );
}

export { errorOn, spinnerOff, spinnerOn, infoShow, infoHide };
