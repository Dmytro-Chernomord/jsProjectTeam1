import movie from '../template/one_movie.hbs';
import apiService from './apiServices.js';
import refs from './refs.js';
import { errorOn, spinnerOff, spinnerOn } from './spinner.js';
import { toggleModal } from './togglePage.js';
import addToLocalStorage from './addToLocalStorage.js';

// ----Функция для отрисовки модалки
function generateOneMovieMarkup(id) {
  spinnerOn();
  apiService
    .getOneMovieInfo(id)
    .then(data => {
      refs.movieCard.innerHTML = movie([data]);
      console.log('data.id', data.id);
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

// ----- Закрытие модалки - Вешаем слушатель на крестик в модалке, тоглим класс is-hidden --------
refs.closeModalBtn.addEventListener('click', toggleModal);

// ------
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
    if (event.target.textContent === 'add to watched' || arrWatched === null) {
      watchedArr.push(id);
      localStorage.setItem('add-watched', JSON.stringify(watchedArr));
      checkLocalStorage(id);
    } else if (event.target.textContent === 'remove  "watched"') {
      watchedArr.splice(watchedArr.indexOf(id), 1);
      localStorage.setItem('add-watched', JSON.stringify(watchedArr));
      checkLocalStorage(id);
    }
  });

  const queueArr = [];
  //queue проверяем распарсенные данные из локал сторэдж и если там что-то есть - пушим в наш массив
  if (typeof arrQueue === 'number') {
    queueArr.push(arrQueue);
  } else if (typeof arrQueue === 'object') {
    queueArr.push(...arrQueue);
  }
  //вешаем слушатель на кнопку ueue и проверяем состояние кнопки (добавить или удалить), а потом запускаем функцию, которая меняет текст кнопки
  queueBtn.addEventListener('click', event => {
    if (event.target.textContent === 'add to queue' || arrQueue === null) {
      queueArr.push(id);
      localStorage.setItem('add-queue', JSON.stringify(queueArr));
      checkLocalStorage(id);
    } else if (event.target.textContent === 'remove  "queue"') {
      queueArr.splice(queueArr.indexOf(id), 1);
      localStorage.setItem('add-queue', JSON.stringify(queueArr));
      checkLocalStorage(id);
    }
  });
}

// -----------------------------------------------------------------
// function onListenerBtn(id) {
//   refs.movieCard.addEventListener('click', event => {
//     // let addWatched = event.target.dataset.source;
//     // if (event.target.nodeName !== 'BUTTON') {
//     //   return;
//     // }
//     // const watchedArr = [];
//     // const queueArr = [];
//     // if (addWatched === 'add-watched') {
//     //   const parseLocalStorage = JSON.parse(localStorage.getItem('add-watched'));
//     //   console.log('parseLocalStorage:', parseLocalStorage);
//     //   if (parseLocalStorage === null) {
//     //     console.log('parseLocalStorage === null');
//     //     watchedArr.push(id);
//     //     localStorage.setItem('add-watched', JSON.stringify(watchedArr));
//     //   } else if (parseLocalStorage.includes(Number(id))) {
//     //     console.log(
//     //       'parseLocalStorage.includes(id)',
//     //       parseLocalStorage.includes(Number(id)),
//     //     );
//     //     parseLocalStorage.splice(parseLocalStorage.indexOf(id), 1);
//     //     localStorage.setItem('add-watched', JSON.stringify(parseLocalStorage));
//     //   } else if (watchedArr.length === 0) {
//     //     watchedArr.push(...parseLocalStorage, id);
//     //     console.log('watchedArr.length === 0', 'watchedArr:', watchedArr);

//     //     localStorage.setItem('add-watched', JSON.stringify(watchedArr));
//     //   } else if (watchedArr.length > 0) {
//     //     console.log('watchedArr.length true');
//     //     watchedArr.push(id);
//     //     localStorage.setItem('add-watched', JSON.stringify(watchedArr));
//     //   }

//     //   addLocalStorage('add-watched', id);
//     // } else if (addWatched === 'add-queue') {
//     //   addLocalStorage('add-queue', id);
//     // }
//     checkLocalStorage(id);
//   });
// }

// function addLocalStorage(arr, key, id) {
//   // let parseLocalStorage = JSON.parse(localStorage.getItem(key));
//   // if (parseLocalStorage === null) {
//   //   arr.push(id);
//   //   localStorage.setItem(key, JSON.stringify(arr));
//   // } else {
//   //   if (parseLocalStorage.includes(id)) {
//   //     arr = parseLocalStorage;
//   //     arr.splice(arr.indexOf(id), 1);
//   //     localStorage.setItem(key, JSON.stringify(arr));
//   //   } else {
//   //     arr = parseLocalStorage;
//   //     arr.push(id);
//   //     localStorage.setItem(key, JSON.stringify(arr));
//   //   }
//   // }
// }

//
// ------ не юзалось  --- Функция для изменения текста кнопки в зависимости от наличия id
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
