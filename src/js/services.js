import { getGenre } from './genre-parser';
import refs from './refs.js';
import { createStartMain } from './createMain';

function formattingData(arr) {
  arr.forEach(element => (element.genre_ids = getGenre(element.genre_ids)));
  arr.forEach(element => {
    if (!element.release_date) {
      return;
    }
    if (element.release_date.length > 4) {
      return (element.release_date = element.release_date.slice(0, 4));
    }
    if (element.release_date.length === 4) {
      return element.release_date;
    }
  });
  return arr;
}

function formattingDataOneMovie(arr) {
  let genre = [];
  for (let i = 0; i < arr[0].genres.length; i++) {
    genre.push(arr[0].genres[i].id);
  }
  arr[0].genre_ids = getGenre(genre);
  arr[0].release_date = arr[0].release_date.slice(0, 4);
  return arr;
}

function changeQuantity(arr, value) {
  for (let i = 0; i <= value; i++) {
    arr.pop();
  }
  return arr;
}

function definitionBtn() {
  let str = '';
  // console.log(refs.watchedBtn.classList.contains('btn--accent'));
  if (refs.watchedBtn.classList.contains('btn--accent')) {
    str = 'add-watched';
  } else {
    str = 'add-queue';
  }
  return str;
}

function definitionPage() {
  let code = '';
  // определить что сейчас в каком состоянии страница
  // home или library
  // какая кнопка нажата(активна)
  // в каком состоянии пагинатор
  return code;
}

function callMarkup() {
  let state = definitionPage();
  // с имитировать вызов на этом месте с учетом состояния страницы
  //

  // заглушка
  createStartMain();
}

export {
  changeQuantity,
  formattingData,
  definitionBtn,
  formattingDataOneMovie,
  callMarkup,
};
