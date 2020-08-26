import { getGenre } from './genre-parser';

function formattingData(arr) {
  arr.forEach(element => (element.genre_ids = getGenre(element.genre_ids)));
  arr.forEach(
    element => (element.release_date = element.release_date.slice(0, 4)),
  );
  return arr;
}

function changeQuantity(arr, value) {
  for (let i = 0; i <= value; i++) {
    arr.pop();
  }
  return arr;
}

export { changeQuantity, formattingData };
