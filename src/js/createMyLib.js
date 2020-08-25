import refs from './refs.js';
import { togglePageToHome, togglePageToLib } from './togglePage.js';

refs.nav.addEventListener('click', event => {
  event.preventDefault();
  if (event.target === refs.myLib) {
    togglePageToLib();
  } else if (event.target === refs.home) {
    togglePageToHome();
  }
});

refs.logo.addEventListener('click', event => {
  event.preventDefault();
  togglePageToHome();
});
