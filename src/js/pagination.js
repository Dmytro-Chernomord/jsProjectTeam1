import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import refs from './refs.js';
// import createStartMain from './createMain.js';
import { createStartMain } from './createMain.js';
import { updateMarkup } from './library-markup.js';
import { definitionBtn } from './services.js';

function scroll(height) {
  setTimeout(() => {
    window.scrollTo({
      top: height + refs.searchBox.clientHeight,
      behavior: 'smooth',
    });
  }, 500);
}

const mainPagination = new Pagination(refs.mainPaginationContainer, {
  // Total number of items
  totalItems: 10000,
  // Items per page
  itemsPerPage: 20,
  // Visible pages
  visiblePages: 5,
  // Current page
  page: 1,
  // center number
  centerAlign: true,
  //default class
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
});

mainPagination.on('afterMove', function (evt) {
  let currentPage = evt.page;
  createStartMain(currentPage);
  scroll(0);
});

function checkTotalItems(obj) {
  if (obj === null) {
    return;
  }

  watchedPagination.setTotalItems(obj.length);
  watchedPagination.reset();
}

const watchedPagination = new Pagination(refs.watchedPaginationContainer, {
  // Total number of items
  totalItems: 500,
  // Items per page
  itemsPerPage: 12,
  // Visible pages
  visiblePages: 5,
  // Current page
  page: 1,
  // center number
  centerAlign: true,
  //default class
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
});

watchedPagination.on('afterMove', function (evt) {
  let currentPage = evt.page;
  // Функция внизу не создана
  let str = definitionBtn();
  updateMarkup(str, currentPage);
  // watchedPagination.reset();
  // watchedPagination.movePageTo(currentPage);
  // watchedPagination.reset();
});

const searchPagination = new Pagination(refs.searchPaginationContainer, {
  // Total number of items
  totalItems: 1000,
  // Items per page
  itemsPerPage: 12,
  // Visible pages
  visiblePages: 5,
  // Current page
  page: 1,
  // center number
  centerAlign: true,
  //default class
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
});

// searchPagination.on('afterMove', function (evt) {
//   let currentPage = evt.page;
//   // createStartMain(currentPage);
//   // updateMurkupBySearch();
//   // scroll(0);
// });

export {
  mainPagination,
  checkTotalItems,
  scroll,
  watchedPagination,
  searchPagination,
};
