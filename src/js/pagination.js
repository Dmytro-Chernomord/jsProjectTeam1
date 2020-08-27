import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import refs from './refs.js';
import createStartMain from './createMain.js';
import { updateMarkup, generateMovieLibrary } from './library-markup.js';

// const mainPaginationContainer = document.getElementById(
//   'tui-pagination-container',
// );

// const watchedPaginationContainer = document.getElementById(
//   'tui-pagination-container-watched',
// );

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
  var currentPage = evt.page;
  createStartMain(currentPage);
});

// myPagination.getCurrentPage();

function checkTotalItems() {
  const watchedQuantity = localStorage.getItem('add-watched');
  const parsedWatchedQuantity = JSON.parse(watchedQuantity);
  let itemsQuantity;

  if (parsedWatchedQuantity === null) {
    itemsQuantity = 0;
  } else {
    itemsQuantity = parsedWatchedQuantity.length;
  }
  return itemsQuantity;
}

const watchedPagination = new Pagination(refs.watchedPaginationContainer, {
  // Total number of items
  totalItems: checkTotalItems(),
  // Items per page
  itemsPerPage: 3,
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
  var currentPage = evt.page;
  // Функция внизу не подходит
  generateMovieLibrary(currentPage);
});

export { mainPagination };
