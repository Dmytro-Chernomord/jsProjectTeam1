import movies from '../template/movies.hbs';
import refs from './refs.js';
import apiService from './apiServices.js';
import { checkTotalItems } from './pagination.js';
import { infoShow, infoHide } from './spinner.js';

refs.myLib.addEventListener('click', () => updateMarkup('add-watched'));
refs.watchedBtn.addEventListener('click', () => updateMarkup('add-watched'));
refs.queueBtn.addEventListener('click', () => updateMarkup('add-queue'));

function updateMarkup(str) {
  refs.gallery.innerHTML = '';
  generateMovieLibrary(str);
}
function checkLSlength(el) {
  if (el.length === 0) {
    infoShow();
  }
}

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

// ----------------Переключатель цвета между кнопоками library -----
refs.queueBtn.addEventListener('click', () => {
  refs.watchedBtn.classList.remove('btn--accent');
  refs.queueBtn.classList.add('btn--accent');
});
refs.watchedBtn.addEventListener('click', () => {
  refs.watchedBtn.classList.add('btn--accent');
  refs.queueBtn.classList.remove('btn--accent');
});
