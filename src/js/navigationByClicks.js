import refs from './refs.js';
import {
  togglePageToHome,
  togglePageToLib,
  toggleModal,
} from './togglePage.js';
import createStartMain from './createMain.js';
import { mainPagination } from './pagination.js';
import libraryClick from './library-markup.js';

refs.nav.addEventListener('click', event => {
  event.preventDefault();
  if (event.target === refs.myLib) {
    togglePageToLib();
  } else if (event.target === refs.home) {
    togglePageToHome();
    createStartMain(1);
    mainPagination.movePageTo(1);
    // ------При выходе из library accent-color возвращается на кнопку watched
    libraryClick.updateAccentBtn();
    libraryClick.replaseBtnModal();
  }
});

refs.logo.addEventListener('click', event => {
  event.preventDefault();
  togglePageToHome();
  createStartMain(1);
  mainPagination.movePageTo(1);
  // ------При выходе из library accent-color возвращается на кнопку watched
  libraryClick.updateAccentBtn();
  libraryClick.replaseBtnModal();
});

refs.modalLib.addEventListener('click', event => {
  event.preventDefault();
  toggleModal();
  togglePageToLib();
});
function escCloseModal() {
  if (event.key === 'Escape') {
    toggleModal();
  }
}

window.addEventListener('keyup', escCloseModal);


