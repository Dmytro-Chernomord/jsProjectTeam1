import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import createStartMain from './createMain.js';

// console.log(Pagination);

const container = document.getElementById('tui-pagination-container');

console.log(container);

const myPagination = new Pagination(container, {
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

  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
});

myPagination.getCurrentPage();

myPagination.on('afterMove', function (evt) {
  var currentPage = evt.page;
  console.log(currentPage);
  createStartMain(currentPage);
});
