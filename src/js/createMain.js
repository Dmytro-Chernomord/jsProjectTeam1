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

// createStartMain();
(function start() {
  createStartMain(1);
})();

// refs.input.addEventListener('change', updateMurkupBySearch);

function updateMainMarkup(arr) {
  refs.gallery.innerHTML = movies(arr);
  // refs.spinner.classList.add('visually-hidden');
}

let searchQuery = '';
let page = 1;

refs.input.addEventListener('change', evt => {
  // evt.preventDefault();
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
      // searchPagination.setItemsPerPage(12);
      searchPagination.movePageTo(1);
      let movies = formattingData(data.results);
      if (movies.length === 20) {
        movies = changeQuantity(movies, 7);
      }

      updateMainMarkup(movies);
      if (movies.length) {
        hideSortBtns();
        refs.notification.classList.add('visually-hidden');
        // return updateMainMarkup(data.results);
      } else {
        refs.notification.classList.remove('visually-hidden');
      }
    })
    .catch(() => errorOn())
    .finally(() => spinnerOff());
});

searchPagination.on('afterMove', function (evt) {
  // evt.preventDefault();
  showSortBtns();
  let currentPage = evt.page;
  spinnerOn();
  apiService
    .getMoviesBySearch(searchQuery, currentPage)
    .then(data => {
      // let itemCount = data.total_results;
      searchPagination.setTotalItems(data.total_results - data.total_pages * 8);
      // searchPagination.setItemsPerPage(12);
      let movies = formattingData(data.results);

      if (movies.length === 20) {
        movies = changeQuantity(movies, 7);
      }
      updateMainMarkup(movies);
      if (movies.length) {
        hideSortBtns();
        refs.notification.classList.add('visually-hidden');
        // return updateMainMarkup(data.results);
      } else {
        refs.notification.classList.remove('visually-hidden');
      }
    })
    .catch(() => errorOn())
    .finally(() => spinnerOff());
  scroll(0);
});

// function updateMurkupBySearch(event) {
//   event.preventDefault();
//   showSortBtns();
//   let query = event.target.value;
//   if (query == false) return;
//   // event.target.value = '';
//   spinnerOn();
//   refs.mainPaginationContainer.classList.add('is-none-pagination');
//   apiService
//     .getMoviesBySearch(query)
//     .then(data => {
//       let movies = formattingData(data.results);
//       // if (movies.length === 20) {
//       //   movies = changeQuantity(movies, 7);
//       // }
//       if (movies.length) {
//         hideSortBtns();
//         refs.notification.classList.add('visually-hidden');
//         return updateMainMarkup(data.results);
//       } else {
//         refs.notification.classList.remove('visually-hidden');
//       }
//     })
//     .catch(() => errorOn())
//     .finally(() => {
//       spinnerOff();
//     });
// }

function hideSortBtns() {
  refs.sortBtns.classList.add('visually-hidden');
}

function showSortBtns() {
  refs.sortBtns.classList.remove('visually-hidden');
}

// export default createStartMain;
export { createStartMain, updateMainMarkup, hideSortBtns, showSortBtns };
