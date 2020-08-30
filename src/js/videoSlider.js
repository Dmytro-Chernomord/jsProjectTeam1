import videoSliderHandelbars from '../template/videoSwiper.hbs';

const refs = {
  iframe: document.querySelector('iframe'),
  // swiperContainer: document.querySelector('.swiper-container'),
  swiperWrapper: document.querySelector('.swiper-wrapper'),
};
let moviePlayUrl = '';
refs.swiperWrapper.addEventListener('mouseover', moviePlay);
refs.swiperWrapper.addEventListener('mouseout', stopMovie);
function moviePlay() {
  const target = event.target;
  const url = target.getAttribute('src');
  moviePlayUrl = url;
  const letPlay = target.setAttribute('src', `${url}&autoplay=1`);
}

function stopMovie() {
  //   console.log(moviePlayUrl);
  const target = event.target;
  const stopPlay = target.setAttribute('src', moviePlayUrl);
}

let movieArray = [
  'kGM4uYZzfu0',
  'pAZGcmvrTX9M',
  'xw1vQgVaYNQ',
  'eLEwNo78f0k',
  'n4YXauObskA',
  'kGM4uYZzfu0',
  't433PEQGErc',
  'kzTktI1YNn4',
  'u2ncERi6TgU',
];
const markupVideo = videoSliderHandelbars(movieArray);

console.log(markupVideo);

refs.swiperWrapper.insertAdjacentHTML('beforeend', markupVideo);

var swiper = new Swiper('.swiper-container', {
  slidesPerView: 3,
  slidesPerColumn: 1,
  spaceBetween: 0,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  //   mousewheel: true,
  keyboard: true,
});
