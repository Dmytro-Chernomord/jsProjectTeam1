import { getGenre } from './genre-parser';

function formattingData(arr) {
  arr.forEach(element => (element.genre_ids = getGenre(element.genre_ids)));
  arr.forEach(
    element => (element.release_date = element.release_date.slice(0, 4)),
  );
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

export { changeQuantity, formattingData, formattingDataOneMovie };
