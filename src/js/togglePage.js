import refs from './refs.js';

export const togglePageToHome = function () {
  refs.home.classList.add('nav-link--curent');
  refs.myLib.classList.remove('nav-link--curent');
  refs.header.classList.add('header-home');
  refs.header.classList.remove('header-lib');
  refs.btnBox.classList.add('visually-hidden');
  refs.searchBox.classList.remove('visually-hidden');
};
export const togglePageToLib = function () {
  refs.home.classList.remove('nav-link--curent');
  refs.myLib.classList.add('nav-link--curent');
  refs.header.classList.remove('header-home');
  refs.header.classList.add('header-lib');
  refs.btnBox.classList.remove('visually-hidden');
  refs.searchBox.classList.add('visually-hidden');
};
