import movie from '../template/one_movie.hbs';

const apiKey = '89b9004c084fb7d0e8ffaadd17cb8254';
const galleryRef = document.querySelector('.movies-list');

// ---- Собираем инфо по фильму по id --------
function getOneMovieInfo(movie_id) {
  const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}&language=en-US`;
  return fetch(url).then(res => res.json());
}

// ----Функция для перерисовки страницы по клику

function generateOneMovieMarkup(id) {
  getOneMovieInfo(id).then(data => {
    galleryRef.innerHTML = movie([data]);
  });
}

// ----- Вешаем слушатель на список --------
galleryRef.addEventListener('click', onMovieCardClick);

function onMovieCardClick(event) {
  event.preventDefault();
  let clickedItem = event.target;

  if (clickedItem.nodeName === 'UL') return;
  generateOneMovieMarkup(clickedItem.dataset.id);
}
