import refs from './refs.js';
import {
  togglePageToHome,
  togglePageToLib,
  toggleModal,
  onOpenModal,
  onCloseModal,
  toggleModaltoLib,

} from './togglePage.js';
import createStartMain from './createMain.js';
import { mainPagination } from './pagination.js';
import {libraryClick , updateMarkup, updateAccentBtn} from './library-markup.js';
import {
  generateOneMovieMarkup,
  checkTrailerKey,
  checkLocalStorage,
  generateMovieLibrary,
} from './one_movie_main.js';

refs.nav.addEventListener('click', event => {
  event.preventDefault();
  if (event.target === refs.myLib) {
    togglePageToLib();
  } else if (event.target === refs.home) {
    togglePageToHome();
    createStartMain();
    mainPagination.movePageTo(1);
    // ------При выходе из library accent-color возвращается на кнопку watched
    libraryClick.updateAccentBtn();
    libraryClick.replaseBtnModal();
  }
});
refs.logo.addEventListener('click', event => {
  event.preventDefault();
  togglePageToHome();
  createStartMain();
  mainPagination.movePageTo(1);
  // ------При выходе из library accent-color возвращается на кнопку watched
  libraryClick.updateAccentBtn();
  libraryClick.replaseBtnModal();
});

refs.modalLib.addEventListener('click', ()=> {
updateAccentBtn();
toggleModaltoLib();
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
  generateOneMovieMarkup(clickedItem.dataset.id);
  setTimeout(checkLocalStorage, 500, clickedItem.dataset.id);
  checkTrailerKey(clickedItem.dataset.id);
  

  // setTimeout(checkTrailerKey, 100, clickedItem.dataset.id);
};

// ----- Закрытие модалки - Вешаем слушатель на крестик в модалке, тоглим класс is-hidden --------
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.libraryBtnClose.addEventListener('click', onCloseModal);


