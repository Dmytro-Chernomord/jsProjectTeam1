import movies from '../template/movies.hbs';
import refs from './refs.js';
import apiService from './apiServices.js';
import { checkTotalItems } from './pagination.js';
import { infoShow, infoHide } from './spinner.js';

// -----------------слушалель на myLibrary, btn watched, btn queue
refs.myLib.addEventListener('click', () => {
  updateAccentBtn();
  updateMarkup('add-watched');
  // замена кнопки close в modal при переходе в library
  refs.libraryBtnClose.classList.remove('is-hidden-btn');
  refs.closeModalBtn.classList.add('is-hidden-btn');
});
refs.watchedBtn.addEventListener('click', () => updateMarkup('add-watched'));
refs.queueBtn.addEventListener('click', () => updateMarkup('add-queue'));

// -------------------------------обновляет разметку
function updateMarkup(str) {
  refs.gallery.innerHTML = '';
  generateMovieLibrary(str);
}

function checkLSlength(el) {
  if (el.length === 0) {
    infoShow();
  }
}

// --------------------------парсит localStorage и генерит список карточек
function generateMovieLibrary(str) {
  infoHide();
  let obj = JSON.parse(localStorage.getItem(str));
  checkLSlength(obj);
  console.log(obj);
  checkTotalItems(obj);
  for (let el of obj) {
    let allMovies = [];
    apiService.getOneMovieInfo(el).then(data => {
      allMovies.push(data);
      refs.gallery.insertAdjacentHTML('beforeend', movies(allMovies));
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
  refs.watchedBtn.classList.add('btn--accent');
  refs.queueBtn.classList.remove('btn--accent');
}
// -----------замена кнопки close в modal при переходе из library
function replaseBtnModal() {
  refs.libraryBtnClose.classList.add('is-hidden-btn');
  refs.closeModalBtn.classList.remove('is-hidden-btn');
}

export default {
  updateAccentBtn,
  updateMarkup,
  replaseBtnModal,
};
