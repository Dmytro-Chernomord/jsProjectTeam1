import movies from '../template/movies.hbs';
import { getGenre } from './genre-parser';
import apiService from './apiServices.js';
import refs from './refs.js';

function createStartMain(page) {
  apiService.getPopularMovies(page).then(data => {
    data.results.forEach(
      element => (element.genre_ids = getGenre(element.genre_ids)),
    );
    data.results.forEach(
      element => (element.release_date = element.release_date.slice(0, 4)),
    );
    updateMainMarkup(data.results);
  });
}

createStartMain();
// console.log(movies);

refs.input.addEventListener('change', updateMurkupBySearch);

function updateMainMarkup(arr) {
  refs.gallery.innerHTML = movies(arr);
}

function updateMurkupBySearch(event) {
  let query = event.target.value;
  apiService.getMoviesBySearch(query).then(data => {
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
  });
}

export default createStartMain;
