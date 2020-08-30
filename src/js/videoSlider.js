const refs = {
  iframe: document.querySelector('iframe'),
  swiperContainer: document.querySelector('.swiper-container'),
};
let moviePlayUrl = '';
refs.swiperContainer.addEventListener('mouseover', moviePlay);
refs.swiperContainer.addEventListener('mouseout', stopMovie);
function moviePlay() {
  const target = event.target;
  const url = target.getAttribute('src');
  moviePlayUrl = url;
  const letPlay = target.setAttribute('src', `${url}&autoplay=1`);
}

function stopMovie() {
  console.log(moviePlayUrl);
  const target = event.target;
  const stopPlay = target.setAttribute('src', moviePlayUrl);
}
// console.log(url);
// const a = document.querySelector('iframe');
// console.log(a);
// refs.iframe.addEventListener('mouseover', test);
// function test() {
//   refs.iframe.setAttribute(
//     'src',
//     'http://www.youtube.com/embed/AZGcmvrTX9M?autoplay=1&enablejsapi=1&rel=0&mute=1&controls=0&fs=1&showinfo=0',
//   );
// }

// refs.iframe.addEventListener('mouseout', test2);
// function test2() {
//   refs.iframe.setAttribute(
//     'src',
//     'http://www.youtube.com/embed/AZGcmvrTX9M?autoplay=0&enablejsapi=1&rel=0&mute=1',
//   );
// }

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
  ' eyzxu26-Wqk',
];
