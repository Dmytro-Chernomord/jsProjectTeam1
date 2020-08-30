import videoSliderHandelbars from '../template/videoSwiper.hbs';
import apiServices from './apiServices.js';
import refs from './refs.js';

let moviePlayUrl = '';
refs.swiperWrapper.addEventListener('mouseover', moviePlay);
refs.swiperWrapper.addEventListener('mouseout', stopMovie);

let movieArray = ['4werfN6fQ44'];

function librarySlider() {
  refs.swiperWrapper.innerHTML = '';
  const getId = localStorage.getItem('add-queue');
  const pasId = JSON.parse(getId);
  let popularMovies = [];
  if (pasId.length >= 3) {
    pasId.forEach(element => {
      const URL = `https://api.themoviedb.org/3/movie/${element}/videos?api_key=89b9004c084fb7d0e8ffaadd17cb8254&language=en-US`;
      fetch(URL)
        .then(res => res.json())
        .then(data => {
          const videos = data.results;
          const video = videos[0];
          const videoKey = video.key;
          const markupVideo = `<div class="swiper-slide">
      <iframe class="iframe" width="250" height="140"
          src="http://www.youtube.com/embed/${videoKey}?enablejsapi=1&rel=0&mute=1&modestbranding=1&showinfo=0&autohide=1"
          allow="autoplay; encrypted-media" frameborder="0" onpause allowfullscreen=""></iframe>
  </div>`;
          refs.swiperWrapper.insertAdjacentHTML('beforeend', markupVideo);
          var swiper = new Swiper('.swiper-container', {
            slidesPerView: 3,
            slidesPerColumn: 1,
            spaceBetween: 0,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            keyboard: true,
          });
        });
    });
  } else {
    popularSlider();
  }
}

function popularSlider() {
  refs.swiperWrapper.innerHTML = '';

  let popularMovies = [];
  apiServices.getPopularMovies().then(data => {
    popularMovies = data.results.map(el => el.id);

    const markUpPopularMovie = popularMovies.slice(0, 5);

    markUpPopularMovie.forEach(element => {
      const URL = `https://api.themoviedb.org/3/movie/${element}/videos?api_key=89b9004c084fb7d0e8ffaadd17cb8254&language=en-US`;
      fetch(URL)
        .then(res => res.json())
        .then(data => {
          const videos = data.results;
          const video = videos[0];
          const videoKey = video.key;
          const markupVideo = `<div class="swiper-slide">
        <iframe class="iframe" width="250" height="140"
            src="http://www.youtube.com/embed/${videoKey}?enablejsapi=1&rel=0&mute=1&modestbranding=1&showinfo=0&autohide=1"
            allow="autoplay; encrypted-media" frameborder="0" onpause allowfullscreen=""></iframe>
    </div>`;
          refs.swiperWrapper.insertAdjacentHTML('beforeend', markupVideo);
          var swiper = new Swiper('.swiper-container', {
            slidesPerView: 3,
            slidesPerColumn: 1,
            spaceBetween: 0,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            keyboard: true,
          });
        });
    });
  });
}

function moviePlay() {
  const target = event.target;
  const url = target.getAttribute('src');
  moviePlayUrl = url;
  const letPlay = target.setAttribute('src', `${url}&autoplay=1`);
}

function stopMovie() {
  const target = event.target;
  const stopPlay = target.setAttribute('src', moviePlayUrl);
}

// const markupVideo = videoSliderHandelbars(movieArray);

// console.log(markupVideo);

// refs.swiperWrapper.insertAdjacentHTML('beforeend', markupVideo);

// var swiper = new Swiper('.swiper-container', {
//   slidesPerView: 3,
//   slidesPerColumn: 1,
//   spaceBetween: 0,
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },
//   //   mousewheel: true,
//   keyboard: true,
// });
export { popularSlider, librarySlider };
