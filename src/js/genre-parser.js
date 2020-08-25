//тут храниться масив жанров
let genre;

(async function name() {
  genre = await askGenre();
}());


function askGenre() {
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=ceeec3f9fd3ea0c856548c86fe2bce84&language=en-US`;
  return fetch(url)
    .then(res => res.json())
    .then(gen => gen.genres);
};


//@idGenre - масив id жантов
//return - строка жанров
function getGenre(idGenre) {
  let answer = '';
  for (let i = 0; i < idGenre.length; i++) {
    let value = idGenre[i];
    // жанров не больше 2-х
    if ((i > 1)&& (idGenre.length >3)) {
      answer += 'Other';
      break;
    } else {
      answer += genre.find(genre => genre.id === value).name;
    }
    // разделитель для жанров
    if ((i === 0 )&&(idGenre.length > 1)|| (i === 1 )&&(idGenre.length > 2)) {
      answer += ', ';
    }
  }
  return answer;
};

export {getGenre};
