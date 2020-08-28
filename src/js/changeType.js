import refs from './refs.js';
import apiService from './apiServices.js';
// import createStartMain from './createMain.js';
import { createStartMain } from './createMain.js';
import { togglePageToHome } from './togglePage.js';
import { mainPagination } from './pagination.js';

refs.butTypePopular.addEventListener('click', event => {
  event.preventDefault();
  console.log('Popular');
  refs.butTypePopular.classList.add('active');
  refs.butTypeTop_rated.classList.remove('active');
  refs.butTypeUpcoming.classList.remove('active');
  apiService.changeType('popular');
  togglePageToHome();
  createStartMain(1);
  mainPagination.movePageTo(1);
});

refs.butTypeTop_rated.addEventListener('click', event => {
  event.preventDefault();
  console.log('butTypeTop_rated');
  refs.butTypeTop_rated.classList.add('active');
  refs.butTypePopular.classList.remove('active');
  refs.butTypeUpcoming.classList.remove('active');
  apiService.changeType('top_rated');
  togglePageToHome();
  createStartMain(1);
  mainPagination.movePageTo(1);
});

refs.butTypeUpcoming.addEventListener('click', event => {
  event.preventDefault();
  console.log('butTypeUpcoming');
  refs.butTypeUpcoming.classList.add('active');
  refs.butTypePopular.classList.remove('active');
  refs.butTypeTop_rated.classList.remove('active');
  apiService.changeType('upcoming');
  togglePageToHome();
  createStartMain(1);
  mainPagination.movePageTo(1);
});
