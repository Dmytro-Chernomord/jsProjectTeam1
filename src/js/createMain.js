import movies from '../template/movies.hbs';
import apiService from './apiServices.js';
import refs from './refs.js';
import { errorOn, spinnerOff, spinnerOn, infoHide } from './spinner.js';
import { changeQuantity, formattingData } from './services';
import { videoSlider, popularSlider } from './videoSlider.js';
function createStartMain(page) {
  infoHide();
  spinnerOn();
  //начинает отрисовку популярногоSLIDER
  popularSlider();
  apiService
    .getPopularMovies(page)
    .then(data => {
      const moveCards = formattingData(data.results);
      const smallMoveCards = changeQuantity(moveCards, 7);
      updateMainMarkup(smallMoveCards);
    })
    .catch(() => errorOn())
    .finally(() => spinnerOff());
}

// createStartMain();
(function start() {
  createStartMain(1);
})();

refs.input.addEventListener('change', updateMurkupBySearch);

function updateMainMarkup(arr) {
  refs.gallery.innerHTML = movies(arr);
  // refs.spinner.classList.add('visually-hidden');
}

function updateMurkupBySearch(event) {
  event.preventDefault();
  showSortBtns();
  let query = event.target.value;
  if (query == false) return;
  // event.target.value = '';
  spinnerOn();
  refs.mainPaginationContainer.classList.add('is-none-pagination');
  apiService
    .getMoviesBySearch(query)
    .then(data => {
      let movies = formattingData(data.results);
      // if (movies.length === 20) {
      //   movies = changeQuantity(movies, 7);
      // }
      if (movies.length) {
        hideSortBtns();
        refs.notification.classList.add('visually-hidden');
        return updateMainMarkup(data.results);
      } else {
        refs.notification.classList.remove('visually-hidden');
      }
    })
    .catch(() => errorOn())
    .finally(() => {
      spinnerOff();
    });
}

function hideSortBtns() {
  refs.sortBtns.classList.add('visually-hidden');
}

function showSortBtns() {
  refs.sortBtns.classList.remove('visually-hidden');
}

// export default createStartMain;
export { createStartMain, updateMainMarkup, hideSortBtns, showSortBtns };
