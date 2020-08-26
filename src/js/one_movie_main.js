import movie from '../template/one_movie.hbs';
import apiService from './apiServices.js';
import refs from './refs.js';

// ----Функция для перерисовки страницы по клику

function generateOneMovieMarkup(id) {
  apiService.getOneMovieInfo(id).then(data => {
    refs.container.innerHTML = movie([data]);
  });
}

// ----- Вешаем слушатель на список --------
refs.gallery.addEventListener('click', onMovieCardClick);

function onMovieCardClick(event) {
  event.preventDefault();
  let clickedItem = event.target;

  if (clickedItem.nodeName === 'UL') return;
  generateOneMovieMarkup(clickedItem.dataset.id);
}
