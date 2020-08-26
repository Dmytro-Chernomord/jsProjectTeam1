import movie from '../template/one_movie.hbs';
import apiService from './apiServices.js';
import refs from './refs.js';
import { toggleModal } from './togglePage.js';

// ----Функция для отрисовки модалки
function generateOneMovieMarkup(id) {
  apiService.getOneMovieInfo(id).then(data => {
    refs.movieCard.innerHTML = movie([data]);
    onListenerBtn(data.id);
    console.log(data.id);
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
// -----------------------------------------------------------------
function onListenerBtn(id) {
  document.querySelector('.movie-card').addEventListener('click', event => {
    if (event.target.nodeName !== 'BUTTON') {
      return;
    }
    let addWatched = event.target.dataset.source;
    console.log(event.target);
    if (addWatched === 'add-watched') {
      addLocalStorage('add-watched', id);
    } else if (addWatched === 'add-queue') {
      addLocalStorage('add-queue', id);
    }
  });
}

function addLocalStorage(key, id) {
  let list = [];
  let parseLocalStorage = JSON.parse(localStorage.getItem(key));

  if (parseLocalStorage === null) {
    list.push(id);
    localStorage.setItem(key, JSON.stringify(list));
  } else {
    if (parseLocalStorage.includes(id)) {
      return;
    } else {
      list = parseLocalStorage;
      list.push(id);
      localStorage.setItem(key, JSON.stringify(list));
    }
  }
}
// let all = [];
// function generateMovie() {
//   let obj = JSON.parse(localStorage.getItem('add-watched'));
//   obj.forEach(function (el) {
//     apiService.getOneMovieInfo(el).then(data => {
//       all.push(data);
//       console.log(all);
//       refs.gallery.innerHTML = '';
//       refs.gallery.insertAdjacentHTML('beforeend', movies(all));
//     });
//   });
// }
// generateMovie();

// ----- Вешаем слушатель на крестик в модалке --------
refs.closeModalBtn.addEventListener('click', toggleModal);
