export default {
  body: document.querySelector('body'),
  header: document.querySelector('.header'),
  nav: document.querySelector('.nav'),
  logo: document.querySelector('.logo'),
  home: document.querySelector('#home'),
  myLib: document.querySelector('#lib'),
  searchBox: document.querySelector('.search-box'),
  input: document.querySelector('#input'),
  notification: document.querySelector('#notification'),
  btnBox: document.querySelector('.btn-box'),
  gallery: document.querySelector('.movies-list'),
  container: document.querySelector('.container'),
  spinner: document.querySelector('.spinner-border'),
  error: document.querySelector('#error'),
  modal: document.querySelector('[data-modal]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  movieCard: document.querySelector('.movie-card'),
  modalLib: document.querySelector('#modal-lib'),
  headerModal:document.querySelector('.header-modal'),
  watchedBtn: document.querySelector('#watched'),
  queueBtn: document.querySelector('#queue'),
  mainPaginationContainer: document.getElementById('tui-pagination-container'),
  watchedPaginationContainer: document.getElementById(
    'tui-pagination-container-watched',
  ),
  info: document.querySelector('#info'),
  libraryBtnClose: document.querySelector('#btn-library'),
  butTypePopular: document.querySelector('#popular'),
  butTypeTop_rated: document.querySelector('#top_rated'),
  butTypeUpcoming: document.querySelector('#upcoming'),
};
