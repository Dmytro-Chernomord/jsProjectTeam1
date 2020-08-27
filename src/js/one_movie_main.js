import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

import movie from '../template/one_movie.hbs';
import apiService from './apiServices.js';
import refs from './refs.js';
import { errorOn, spinnerOff, spinnerOn } from './spinner.js';
import { toggleModal } from './togglePage.js';
import libraryClick from './library-markup.js';

// ----Функция для отрисовки модалки
function generateOneMovieMarkup(id) {
  spinnerOn();
  apiService
    .getOneMovieInfo(id)
    .then(data => {
      refs.movieCard.innerHTML = movie([data]);
      onListenerBtn(data.id);
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
  toggleModal();
  generateOneMovieMarkup(clickedItem.dataset.id);
  setTimeout(checkLocalStorage, 500, clickedItem.dataset.id);
}

// -----------------------------------------------------------------
// function onListenerBtn(id) {
//   document.querySelector('.movie-card').addEventListener('click', event => {
//     if (event.target.nodeName !== 'BUTTON') {
//       return;
//     }

//     let addWatched = event.target.dataset.source;
//     console.log(addWatched);
//     // console.log(event.target);
//     if (addWatched === 'add-watched') {
//       addLocalStorage('add-watched', id);
//     } else if (addWatched === 'add-queue') {
//       addLocalStorage('add-queue', id);
//     }
//     else if (addWatched = 'trailer') {
//       const URL = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=89b9004c084fb7d0e8ffaadd17cb8254&language=en-US`;
//       fetch(URL)
//         .then(res => res.json())
//         .then((data) => {
//           console.log(data.results);
//           const videos = data.results;
//           const video = videos[0];
//           const videoKey = video.key;
//           console.log(video);
//           console.log(videoKey);
//           const youTubeUrl = `https://www.youtube.com/embed/${videoKey}`;
//         })
//     }
//     checkLocalStorage(id);
//   });
// }

// function addLocalStorage(key, id) {
//   let list = [];
//   let parseLocalStorage = JSON.parse(localStorage.getItem(key));
//   if (parseLocalStorage === null) {
//     list.push(id);
//     localStorage.setItem(key, JSON.stringify(list));
//   } else {
//     if (parseLocalStorage.includes(id)) {
//       list = parseLocalStorage;
//       list.splice(list.indexOf(id), 1);
//       localStorage.setItem(key, JSON.stringify(list));
//     } else {
//       list = parseLocalStorage;
//       list.push(id);
//       localStorage.setItem(key, JSON.stringify(list));
//     }
//   }
// }

// -----------------------------------------------------------------
// function onListenerBtn(id) {
//   document.querySelector('.movie-card').addEventListener('click', event => {
//     if (event.target.nodeName !== 'BUTTON') {
//       return;
//     }

//     let addWatched = event.target.dataset.source;
//     // console.log(addWatched);
//     // console.log(event.target);
//     if (addWatched === 'add-watched') {
//       addLocalStorage('add-watched', id);
//     } else if (addWatched === 'add-queue') {
//       addLocalStorage('add-queue', id);
//     } else if ((addWatched = 'trailer')) {
//       const URL = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=89b9004c084fb7d0e8ffaadd17cb8254&language=en-US`;
//       fetch(URL)
//         .then(res => res.json())
//         .then(data => {
//           // console.log(data.results);
//           const videos = data.results;
//           const video = videos[0];
//           const videoKey = video.key;
//           // console.log(video);
//           // console.log(videoKey);
//           // const youTubeUrl = `https://www.youtube.com/embed/${videoKey}`;
//           const instance = basicLightbox.create(`
//     <iframe src="https://www.youtube.com/embed/${videoKey}" width="560" height="315" frameborder="0"></iframe>
// `);
//           instance.show();
//         });
//     }
//     checkLocalStorage(id);
//   });
// }

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

// ----- Закрытие модалки - Вешаем слушатель на крестик в модалке, тоглим класс is-hidden --------
refs.closeModalBtn.addEventListener('click', toggleModal);
refs.libraryBtnClose.addEventListener('click', toggleModal);

// ------  инициализируем в localStorage массив для хранения id фильмов, если localStorage таких ключей не содержит

(function initLSmyLib() {
  if (localStorage.getItem('add-watched') === null) {
    localStorage.setItem('add-watched', JSON.stringify([]));
  }
  if (localStorage.getItem('add-queue') === null) {
    localStorage.setItem('add-queue', JSON.stringify([]));
  }
})();

//
// ------ Функция для проверки наличия id фильма в local storage

function checkLocalStorage(id) {
  let arrWatched = JSON.parse(localStorage.getItem('add-watched'));
  let arrQueue = JSON.parse(localStorage.getItem('add-queue'));
  let watchBtn = document.querySelector('.watch-btn');
  let queueBtn = document.querySelector('.queue-btn');

  if (arrWatched !== null) {
    if (typeof arrWatched === 'number' && arrWatched === Number(id)) {
      watchBtn.textContent = 'remove  "watched"';
    } else if (
      typeof arrWatched === 'object' &&
      arrWatched.includes(Number(id))
    ) {
      watchBtn.textContent = 'remove  "watched"';
    } else {
      watchBtn.textContent = 'add to watched';
    }
  }
  if (arrQueue !== null && arrQueue.includes(Number(id))) {
    queueBtn.textContent = 'remove  "queue"';
  } else {
    queueBtn.textContent = 'add to queue';
  }
}
// function onListenerBtn(id) {
//   fn1(id)
//   fn2(id)
// }

function onListenerBtn(id) {
  let arrWatched = JSON.parse(localStorage.getItem('add-watched'));
  let arrQueue = JSON.parse(localStorage.getItem('add-queue'));
  let watchBtn = document.querySelector('.watch-btn');
  let queueBtn = document.querySelector('.queue-btn');

  const watchedArr = [];
  //watched проверяем распарсенные данные из локал сторэдж и если там что-то есть - пушим в наш массив
  if (typeof arrWatched === 'number') {
    watchedArr.push(arrWatched);
  } else if (typeof arrWatched === 'object') {
    watchedArr.push(...arrWatched);
  }
  //вешаем слушатель на кнопку watched и проверяем состояние кнопки (добавить или удалить), а потом запускаем функцию, которая меняет текст кнопки
  watchBtn.addEventListener('click', event => {
    if (event.target.textContent === 'add to watched') {
      watchedArr.push(id);
      localStorage.setItem('add-watched', JSON.stringify(watchedArr));
      checkLocalStorage(id);
    } else if (event.target.textContent === 'remove  "watched"') {
      watchedArr.splice(watchedArr.indexOf(id), 1);
      localStorage.setItem('add-watched', JSON.stringify(watchedArr));
      checkLocalStorage(id);
      addNewObjInLibrary('add-watched');
    }
  });

  const queueArr = [];
  //queue проверяем распарсенные данные из локал сторэдж и если там что-то есть - пушим в наш массив
  if (typeof arrQueue === 'number') {
    queueArr.push(arrQueue);
  } else if (typeof arrQueue === 'object') {
    queueArr.push(...arrQueue);
  }
  queueBtn.addEventListener('click', event => {
    if (event.target.textContent === 'add to queue') {
      queueArr.push(id);
      localStorage.setItem('add-queue', JSON.stringify(queueArr));
      checkLocalStorage(id);
    } else if (event.target.textContent === 'remove  "queue"') {
      queueArr.splice(queueArr.indexOf(id), 1);
      localStorage.setItem('add-queue', JSON.stringify(queueArr));
      checkLocalStorage(id);
      addNewObjInLibrary('add-queue');
    }
  });
}
// ---------При закрытии модалки создается новый список в library--------
function addNewObjInLibrary(str) {
  refs.libraryBtnClose.addEventListener('click', () => {
    libraryClick.updateMarkup(str);
  });
}
