import movies from '../template/movies.hbs';
import { getGenre } from './genre-parser';
import apiService from './apiServices.js';
import refs from './refs.js';
import { errorOn, spinnerOff, spinnerOn } from './spinner.js';

function createStartMain(page) {
  spinnerOn();
  apiService
    .getPopularMovies(page)
    .then(data => {
      data.results.forEach(
        element => (element.genre_ids = getGenre(element.genre_ids)),
      );
      data.results.forEach(
        element => (element.release_date = element.release_date.slice(0, 4)),
      );
      updateMainMarkup(data.results);
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
  spinnerOn();
  apiService
    .getMoviesBySearch(query)
    .then(data => {
      const movies = data.results;
      movies.forEach(
        element => (element.genre_ids = getGenre(element.genre_ids)),
      );
      movies.forEach(
        element => (element.release_date = element.release_date.slice(0, 4)),
      );
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
