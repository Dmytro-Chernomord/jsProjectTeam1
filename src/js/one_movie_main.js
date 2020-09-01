import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

import movie from '../template/one_movie.hbs';
import movieRu from '../template/one_movie_ru.hbs';
import apiService from './apiServices.js';
import refs from './refs.js';
import { errorOn, spinnerOff, spinnerOn } from './spinner.js';
import { toggleModal } from './togglePage.js';

import { scroll } from './pagination';

// ----Функция для отрисовки модалки
export const generateOneMovieMarkup = function generateOneMovieMarkup(id) {
  spinnerOn();
  apiService
    .getOneMovieInfo(id)
    .then(data => {
      let currentPageLanguage = localStorage.getItem('languege');
      if (currentPageLanguage === 'en-US') {
        refs.movieCard.innerHTML = movie([data]);
      } else if (currentPageLanguage === 'ru-RU') {
        refs.movieCard.innerHTML = movieRu([data]);
      }
      onListenerBtn(data.id);
    })
    .catch(() => errorOn())
    .finally(() => spinnerOff());
};
// ---- Функция для проверки наличия трейлера и если нет - кнопки для трейлера не отрисует
export const checkTrailerKey = function checkTrailerKey(idValue) {
  const URL = `https://api.themoviedb.org/3/movie/${idValue}/videos?api_key=89b9004c084fb7d0e8ffaadd17cb8254&language=en-US`;
  fetch(URL)
    .then(res => res.json())
    .then(data => {
      if (data.results.length === 0) {
        document.querySelector('.trailer-btn').style.display = 'none';
      }
    });
};
////---------трейлер----------/////////////
let trailerBtn = document.querySelector('.movie-card');
trailerBtn.addEventListener('click', event => {
  if (event.target.dataset.source !== 'trailer') return;
  const trailerId = event.srcElement.dataset.id;
  const URL = `https://api.themoviedb.org/3/movie/${trailerId}/videos?api_key=89b9004c084fb7d0e8ffaadd17cb8254&language=en-US`;
  fetch(URL)
    .then(res => res.json())
    .then(data => {
      const videos = data.results;
      const video = videos[0];
      const videoKey = video.key;
      const instance = basicLightbox.create(`
            <iframe allowFullScreen='allowFullScreen' src="https://www.youtube.com/embed/${videoKey}" width="560" height="315" frameborder="0"></iframe>
        `);
      instance.show();
      refs.body.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
          instance.close();
        }
      });
    });
});

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

export const checkLocalStorage = function checkLocalStorage(id) {
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
};

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
    }
  });
}
