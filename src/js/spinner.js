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
export { errorOn, spinnerOff, spinnerOn };
