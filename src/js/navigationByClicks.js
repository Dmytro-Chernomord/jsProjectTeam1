import refs from './refs.js';
import {
  toggleModaltoLib,
  togglePageToHome,
  togglePageToLib,
  toggleModal,
  onOpenModal,
  onCloseModal,
} from './togglePage.js';
import { definitionBtn } from './services.js';
import { mainPagination } from './pagination.js';
import {
  replaseBtnModal,
  updateAccentBtn,
  updateMarkup,
} from './library-markup.js';
import {
  generateOneMovieMarkup,
  checkTrailerKey,
  checkLocalStorage,
} from './one_movie_main.js';
import { createStartMain } from './createMain.js';

refs.nav.addEventListener('click', event => {
  event.preventDefault();
  if (event.target === refs.myLib) {
    togglePageToLib();
  } else if (event.target === refs.home) {
    togglePageToHome();
    createStartMain(1);
    mainPagination.movePageTo(1);
    // ------При выходе из library accent-color возвращается на кнопку watched
    updateAccentBtn();
    replaseBtnModal();
  }
});
refs.logo.addEventListener('click', event => {
  event.preventDefault();
  togglePageToHome();
  createStartMain(1);
  mainPagination.movePageTo(1);
  // ------При выходе из library accent-color возвращается на кнопку watched
  updateAccentBtn();
  replaseBtnModal();
});

refs.modalLib.addEventListener('click', event => {
  event.preventDefault();
  toggleModaltoLib();
  updateAccentBtn();
  updateMarkup('add-watched');
  // замена кнопки close в modal при переходе в library
  refs.libraryBtnClose.classList.remove('is-hidden-btn');
  refs.closeModalBtn.classList.add('is-hidden-btn');
});

// ----- Вешаем слушатель на список --------
refs.gallery.addEventListener('click', onMovieCardClick);

// ----Функция для открытия модалки
function onMovieCardClick(event) {
  event.preventDefault();
  let clickedItem = event.target;
  if (clickedItem.nodeName === 'UL') return;
  onOpenModal();
  setTimeout(checkLocalStorage, 400, clickedItem.dataset.id);
  generateOneMovieMarkup(clickedItem.dataset.id);
  checkTrailerKey(clickedItem.dataset.id);

  // setTimeout(checkTrailerKey, 100, clickedItem.dataset.id);
}

// ----- Закрытие модалки - Вешаем слушатель на крестик в модалке, тоглим класс is-hidden --------
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.libraryBtnClose.addEventListener('click', () => {
  onCloseModal();
  let str = definitionBtn();
  updateMarkup(str);
});
