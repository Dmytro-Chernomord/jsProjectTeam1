import movies from '../template/movies.hbs';
import apiService from './apiServices.js';
import refs from './refs.js';
import { errorOn, spinnerOff, spinnerOn, infoHide } from './spinner.js';
import { changeQuantity, formattingData } from './services';
import { searchPagination, scroll } from './pagination.js';
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

(function start() {
  createStartMain(1);
})();

function updateMainMarkup(arr) {
  refs.gallery.innerHTML = movies(arr);
}

let searchQuery = '';
let page = 1;

refs.input.addEventListener('change', evt => {
  showSortBtns();
  searchQuery = evt.target.value;
  if (searchQuery == false) return;
  spinnerOn();
  refs.mainPaginationContainer.classList.add('is-none-pagination');
  refs.searchPaginationContainer.classList.remove('is-none-pagination');
  apiService
    .getMoviesBySearch(searchQuery, page)
    .then(data => {
      searchPagination.setTotalItems(data.total_results - data.total_pages * 8);
      searchPagination.movePageTo(1);
      let movies = formattingData(data.results);
      if (movies.length === 20) {
        movies = changeQuantity(movies, 7);
      }

      updateMainMarkup(movies);
      if (movies.length) {
        hideSortBtns();
        refs.notification.classList.add('visually-hidden');
      } else {
        refs.notification.classList.remove('visually-hidden');
      }
    })
    .catch(() => errorOn())
    .finally(() => spinnerOff());
});

searchPagination.on('afterMove', function (evt) {
  showSortBtns();
  let currentPage = evt.page;
  spinnerOn();
  apiService
    .getMoviesBySearch(searchQuery, currentPage)
    .then(data => {
      searchPagination.setTotalItems(data.total_results - data.total_pages * 8);
      let movies = formattingData(data.results);

      if (movies.length === 20) {
        movies = changeQuantity(movies, 7);
      }
      updateMainMarkup(movies);
      if (movies.length) {
        hideSortBtns();
        refs.notification.classList.add('visually-hidden');
      } else {
        refs.notification.classList.remove('visually-hidden');
      }
    })
    .catch(() => errorOn())
    .finally(() => spinnerOff());
  scroll(0);
});

function hideSortBtns() {
  refs.sortBtns.classList.add('visually-hidden');
}

function showSortBtns() {
  refs.sortBtns.classList.remove('visually-hidden');
}

export { createStartMain, updateMainMarkup, hideSortBtns, showSortBtns };
