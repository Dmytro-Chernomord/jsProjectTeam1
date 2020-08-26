import movies from '../template/movies.hbs';
import { getGenre } from './genre-parser';

const apiKey = '89b9004c084fb7d0e8ffaadd17cb8254';
const inputRef = document.querySelector('#input');
function createMain(search) {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1&query=${search}`;
  return fetch(url).then(res => res.json());
}

function insertHtml() {
  createMain().then(data => {
    // console.log(data.results[0].id);
    // console.log(data.results);
    data.results.forEach(
      element => (element.genre_ids = getGenre(element.genre_ids)),
    );
    data.results.forEach(
      element => (element.release_date = element.release_date.slice(0, 4)),
    );
    document.querySelector('.movies-list').innerHTML = movies(data.results);
  });
}

insertHtml();
// console.log(movies);
