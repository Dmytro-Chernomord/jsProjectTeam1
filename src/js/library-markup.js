import refs from './refs.js';
import apiService from './apiServices.js';
import { checkTotalItems, watchedPagination } from './pagination.js';
import { infoShow, infoHide } from './spinner.js';
import { createCardMovie } from './createGallery.js';
import { formattingDataOneMovie } from './services';
import { librarySlider, popularSlider } from './videoSlider.js';
import { showSortBtns, hideSortBtns } from './createMain.js';

// -----------------слушалель на myLibrary, btn watched, btn queue
refs.myLib.addEventListener('click', () => {
  infoHide();
  updateAccentBtn();
  updateMarkup('add-watched');
  // замена кнопки close в modal при переходе в library
  refs.libraryBtnClose.classList.remove('is-hidden-btn');
  refs.closeModalBtn.classList.add('is-hidden-btn');
});
refs.watchedBtn.addEventListener('click', () => updateMarkup('add-watched'));
refs.queueBtn.addEventListener('click', () => updateMarkup('add-queue'));

// -------------------------------обновляет разметку
function updateMarkup(str, page = 1) {
  refs.gallery.innerHTML = '';
  librarySlider();
  generateMovieLibrary(str, page);
}

function checkLSlength(el) {
  if (el.length === 0) {
    infoShow();
  }
}

// --------------------------парсит localStorage и генерит список карточек
function generateMovieLibrary(str, page) {
  infoHide();
  hideSortBtns();
  //начинает отрисовку в очереди если там 3 и более фильмов, либо популярного
  // librarySlider();
  let obj = JSON.parse(localStorage.getItem(str));
  checkLSlength(obj);
  if (page === 1) {
    checkTotalItems(obj);
  }

  let iterator = (page - 1) * 12;
  let counter = obj.length - iterator;
  if (counter > 12) {
    counter = 12;
    // watchedPagination.reset();
  }
  for (let i = iterator; i < counter + iterator; i++) {
    let allMovies = [];
    apiService.getOneMovieInfo(obj[i]).then(data => {
      allMovies.push(data);
      console.log(allMovies);
      allMovies = formattingDataOneMovie(allMovies);
      createCardMovie(allMovies);
    });
  }
}

// ----------------Переключатель цвета между кнопоками library
refs.queueBtn.addEventListener('click', () => {
  refs.watchedBtn.classList.remove('btn--accent');
  refs.queueBtn.classList.add('btn--accent');
});
refs.watchedBtn.addEventListener('click', () => {
  updateAccentBtn();
});
function updateAccentBtn() {
  const test = localStorage.getItem('add-watched');
  const testJson = JSON.parse(test);
  const test2 = localStorage.getItem('add-watched');
  const testJson2 = JSON.parse(test);
  console.log(test);
  if (testJson.length === testJson2.length) {
    // popularSlider();
  }
  refs.watchedBtn.classList.add('btn--accent');
  refs.queueBtn.classList.remove('btn--accent');
}
// -----------замена кнопки close в modal при переходе из library
function replaseBtnModal() {
  refs.libraryBtnClose.classList.add('is-hidden-btn');
  refs.closeModalBtn.classList.remove('is-hidden-btn');
}

export { replaseBtnModal, updateAccentBtn, updateMarkup };
