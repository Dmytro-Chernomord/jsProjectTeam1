import refs from './refs.js';

export const togglePageToHome = function () {
  refs.home.classList.add('menu-link--curent');
  refs.myLib.classList.remove('menu-link--curent');
  refs.header.classList.add('header-home');
  refs.header.classList.remove('header-lib');
  refs.btnBox.classList.add('visually-hidden');
  refs.searchBox.classList.remove('visually-hidden');
  refs.mainPaginationContainer.classList.remove('is-none-pagination');
  refs.watchedPaginationContainer.classList.add('is-none-pagination');
};
export const togglePageToLib = function () {
  refs.home.classList.remove('menu-link--curent');
  refs.myLib.classList.add('menu-link--curent');
  refs.header.classList.remove('header-home');
  refs.header.classList.add('header-lib');
  refs.btnBox.classList.remove('visually-hidden');
  refs.searchBox.classList.add('visually-hidden');
  refs.mainPaginationContainer.classList.add('is-none-pagination');
  refs.watchedPaginationContainer.classList.remove('is-none-pagination');
};
export const toggleModal = function () {
  refs.modal.classList.toggle('is-hidden');
};
