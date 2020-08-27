import refs from './refs.js';
import {
  togglePageToHome,
  togglePageToLib,
  toggleModal,
} from './togglePage.js';
import createStartMain from './createMain.js';

refs.nav.addEventListener('click', event => {
  event.preventDefault();
  if (event.target === refs.myLib) {
    togglePageToLib();
  } else if (event.target === refs.home) {
    togglePageToHome();
    createStartMain();
  }
});

refs.logo.addEventListener('click', event => {
  event.preventDefault();
  togglePageToHome();
  createStartMain();
  // --------При выходе из library accent-color возвращается на кнопку watched------
  refs.watchedBtn.classList.add('btn--accent');
  refs.queueBtn.classList.remove('btn--accent');
});

refs.modalLib.addEventListener('click', event => {
  event.preventDefault();
  toggleModal();
  togglePageToLib();
});
function escCloseModal() {
  if (event.key === 'Escape') {
    toggleModal();
  }
}
window.addEventListener('keyup', escCloseModal);
