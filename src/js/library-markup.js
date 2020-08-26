import movies from '../template/movies.hbs';
import refs from './refs.js';
import apiService from './apiServices.js';

refs.myLib.addEventListener('click', () => updateMarkup('add-watched'));
refs.watchedBtn.addEventListener('click', () => updateMarkup('add-watched'));
refs.queueBtn.addEventListener('click', () => updateMarkup('add-queue'));

function updateMarkup(str) {
  refs.gallery.innerHTML = '';
  generateMovieLibrary(str);
}

function generateMovieLibrary(str) {
  let obj = JSON.parse(localStorage.getItem(str));
  for (let el of obj) {
    let allMovies = [];
    apiService.getOneMovieInfo(el).then(data => {
      allMovies.push(data);
      refs.gallery.insertAdjacentHTML('beforeend', movies(allMovies));
    });
  }
}