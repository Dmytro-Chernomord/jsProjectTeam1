import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import createStartMain from './createMain.js';

// console.log(Pagination);

const container = document.getElementById('tui-pagination-container');

console.log(container);

const myPagination = new Pagination(container, {
  // Total number of items
  totalItems: 500,
  // Items per page
  itemsPerPage: 20,
  // Visible pages
  visiblePages: 5,
  // Current page
  page: 1,
  // center aligned
  centerAlign: true,
  // default classes
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  // enable usage statistics
  usageStatistics: true,
});

myPagination.getCurrentPage();

container.addEventListener('click', event => {
  createStartMain(event.target.textContent);
});

// Нужно вставить правильную функицю вместо createStartMain, которая будет принимать значения текстконтента как номер страницы...
