import movie from '../template/one_movie.hbs';
import apiService from './apiServices.js';
import refs from './refs.js';
import { errorOn, spinnerOff, spinnerOn } from './spinner.js';
import { toggleModal } from './togglePage.js';

// ----Функция для отрисовки модалки
function generateOneMovieMarkup(id) {
  spinnerOn();
  apiService
    .getOneMovieInfo(id)
    .then(data => {
      refs.movieCard.innerHTML = movie([data]);
      onListenerBtn(data.id);
      //   console.log(data.id);
    })
    .catch(() => errorOn())
    .finally(() => spinnerOff());
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
  setTimeout(checkLocalStorage, 500, clickedItem.dataset.id);
}
// -----------------------------------------------------------------
function onListenerBtn(id) {
  document.querySelector('.movie-card').addEventListener('click', event => {
    if (event.target.nodeName !== 'BUTTON') {
      return;
    }
  
    let addWatched = event.target.dataset.source;
    console.log(addWatched);
    // console.log(event.target);
    if (addWatched === 'add-watched') {
      addLocalStorage('add-watched', id);
    } else if (addWatched === 'add-queue') {
      addLocalStorage('add-queue', id);
    }
    else if (addWatched = 'trailer') {
      const URL = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=89b9004c084fb7d0e8ffaadd17cb8254&language=en-US`;
      fetch(URL)
        .then(res => res.json())
        .then((data) => {
          console.log(data.results);
          const videos = data.results;
          const video = videos[0];
          const videoKey = video.key;
          console.log(video);
          console.log(videoKey);
          const youTubeUrl = `https://www.youtube.com/embed/${videoKey}`;
        })
    }
    checkLocalStorage(id);
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
      list = parseLocalStorage;
      list.splice(list.indexOf(id), 1);
      localStorage.setItem(key, JSON.stringify(list));
    } else {
      list = parseLocalStorage;
      list.push(id);
      localStorage.setItem(key, JSON.stringify(list));
    }
  }
}

// ----- Вешаем слушатель на крестик в модалке --------
refs.closeModalBtn.addEventListener('click', toggleModal);

// ------
//
// ------ Функция для проверки наличия id фильма в local storage

function checkLocalStorage(id) {
  let arrWatched = JSON.parse(localStorage.getItem('add-watched'));
  let arrQueue = JSON.parse(localStorage.getItem('add-queue'));
  let watchBtn = document.querySelector('.watch-btn');
  let queueBtn = document.querySelector('.queue-btn');
  //   console.log(id);
  //   console.log(arrWatched);
  //   console.log(arrQueue);
  if (arrWatched.includes(Number(id))) {
    watchBtn.textContent = 'remove  "watched"';
  } else {
    watchBtn.textContent = 'add to watched';
  }
  if (arrQueue.includes(Number(id))) {
    queueBtn.textContent = 'remove  "queue"';
  } else {
    queueBtn.textContent = 'add to queue';
  }
}

//
// ------ Функция для изменения текста кнопки в зависимости от наличия id
//
// ------ Функция для

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
