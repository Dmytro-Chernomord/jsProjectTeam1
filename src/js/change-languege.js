import apiService from './apiServices.js';
import renameAllText from './renameAllText';
import { callMarkup } from './services';
import { togglePageToHome } from './togglePage.js';

const Languege = {
  en: 'en-US',
  ru: 'ru-RU',
};

const checkboxLanguegeRef = document.querySelector('.js-switch-input');
const bodyRef = document.querySelector('body');

checkboxLanguegeRef.addEventListener('click', chengaLanguege);

(function initLanguege() {
  if (localStorage.getItem('languege') === null) {
    apiService.language = Languege.en;
    localStorage.setItem('languege', languege);
  } else {
    apiService.language = localStorage.getItem('languege');
  }
  checkboxLanguegeRef.checked =
    apiService.language === Languege.en ? false : true;
  bodyRef.classList.add(apiService.language);
  renameAllText(apiService.language);
  callMarkup();
  togglePageToHome();
})();

function chengaLanguege() {
  let oldLanguege = localStorage.getItem('languege');
  if (apiService.language === Languege.en) {
    apiService.language = Languege.ru;
    localStorage.setItem('languege', apiService.language);
    bodyRef.classList.replace(oldLanguege, apiService.language);
    checkboxLanguegeRef.checked = true;
  } else {
    apiService.language = Languege.en;
    localStorage.setItem('languege', apiService.language);
    bodyRef.classList.replace(oldLanguege, apiService.language);
    checkboxLanguegeRef.checked = false;
  }
  renameAllText(apiService.language);
  callMarkup();
  togglePageToHome();
}
