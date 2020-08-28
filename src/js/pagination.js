import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import refs from './refs.js';
import createStartMain from './createMain.js';
import { updateMarkup } from './library-markup.js';

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
  var currentPage = evt.page;
  createStartMain(currentPage);
  scroll(250);
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
  totalItems: 1,
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
  var currentPage = evt.page;
  // Функция внизу не создана
  let str = '';
  if (refs.watchedBtn.classList.contains('btn--accent')) {
    str = 'add-watched';
  } else {
    str = 'add-queue';
  }
  // console.log(refs.watchedBtn.classList.contains('btn--accent'));
  console.log(str);
  console.log(currentPage);
  updateMarkup(str, currentPage);
  // watchedPagination.reset();
  // watchedPagination.movePageTo(currentPage);
  // console.log(updateMarkup(str, currentPage));
  console.log('Я сообщаю текущую страницу пагинации', currentPage);
});

// function checkActualAccent() {}

export { mainPagination, checkTotalItems, watchedPagination };
