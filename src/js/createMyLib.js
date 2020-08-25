import myLib from '../template/my_library.hbs';
import refs from './refs.js';
console.log(refs.nav);
refs.nav.addEventListener('click', event => {
  event.preventDefault();
  if (event.target === refs.lib) {
    refs.home.classList.remove('nav-link--curent');
    refs.lib.classList.add('nav-link--curent');
  }
});
