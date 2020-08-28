import movies from '../template/movies.hbs';
import refs from './refs.js';

function createCardMovie(obj) {
  refs.gallery.insertAdjacentHTML('beforeend', movies(obj));
}

export { createCardMovie };
