import movies from '../template/movies.hbs';
import apiService from './apiServices.js';
import refs from './refs.js';
import { errorOn, spinnerOff, spinnerOn } from './spinner.js';
import { changeQuantity, formattingData } from './services';

function createStartMain() {
  spinnerOn();
  apiService
    .getPopularMovies()
    .then(data => {
      const moveCards = formattingData(data.results);
      const smallMoveCards = changeQuantity(moveCards, 4);
      updateMainMarkup(smallMoveCards);
    })
    .catch(() => errorOn())
    .finally(() => spinnerOff());
}

createStartMain();
// console.log(movies);

refs.input.addEventListener('change', updateMurkupBySearch);

function updateMainMarkup(arr) {
  refs.gallery.innerHTML = movies(arr);
  // refs.spinner.classList.add('visually-hidden');
}

function updateMurkupBySearch(event) {
  let query = event.target.value;
  if (query == false) return;
  spinnerOn();
  apiService
    .getMoviesBySearch(query)
    .then(data => {
      const movies = formattingData(data.results);
      if (movies.length) {
        refs.notification.classList.add('visually-hidden');
        return updateMainMarkup(data.results);
      } else {
        refs.notification.classList.remove('visually-hidden');
      }
    })
    .catch(() => errorOn())
    .finally(() => spinnerOff());
}

export default createStartMain;
