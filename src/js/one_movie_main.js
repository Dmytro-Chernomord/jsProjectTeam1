import movie from '../template/one_movie.hbs';
import apiService from './apiServices.js';
import refs from './refs.js';
import { toggleModal } from './togglePage.js';

// ----Функция для отрисовки модалки
function generateOneMovieMarkup(id) {
  apiService.getOneMovieInfo(id).then(data => {
    refs.movieCard.innerHTML = movie([data]);
  });
}

// ----- Вешаем слушатель на список --------
refs.gallery.addEventListener('click', onMovieCardClick);

// ----Функция для открытия модалки
function onMovieCardClick(event) {
  event.preventDefault();
  let clickedItem = event.target;

  if (clickedItem.nodeName === 'UL') return;
  refs.modal.classList.toggle('is-hidden');
  generateOneMovieMarkup(clickedItem.dataset.id);
}
// ----- Вешаем слушатель на крестик в модалке --------
refs.closeModalBtn.addEventListener('click', toggleModal);
