import refs from './refs.js';

function errorOn() {
  refs.error.classList.remove('visually-hidden');
}
function spinnerOff() {
  refs.spinner.classList.add('visually-hidden');
}
function spinnerOn() {
  refs.spinner.classList.remove('visually-hidden');
  refs.error.classList.add('visually-hidden');
}
function infoShow() {
  refs.swiperWrapper.classList.add('display-none');
  refs.info.classList.remove('display-none');
  document
    .querySelector('#iframe')
    .setAttribute(
      'src',
      'https://player.vimeo.com/video/39684645?autoplay=1&loop=1&title=0&byline=0&portrait=0&muted=true&#t=0m1s',
    );
  refs.watchedPaginationContainer.classList.add('is-none-pagination-library');
  refs.sortBtns.classList.add('visually-hidden');
  refs.container.classList.remove('container');
  refs.footer.classList.add('footer-min-library');
}

function infoHide() {
  refs.swiperWrapper.classList.remove('display-none');

  refs.info.classList.add('display-none');

  document
    .querySelector('#iframe')
    .setAttribute(
      'src',
      'https://player.vimeo.com/video/39684645?autoplay=0&loop=1&title=0&byline=0&portrait=0&muted=true&#t=0m1s',
    );
  refs.watchedPaginationContainer.classList.remove(
    'is-none-pagination-library',
  );
  refs.sortBtns.classList.remove('visually-hidden');
  refs.footer.classList.remove('footer-min-library');
  document.querySelector('#container').classList.add('container');
}

export { errorOn, spinnerOff, spinnerOn, infoShow, infoHide };
