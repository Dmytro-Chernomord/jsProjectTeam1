import refs from './refs.js';

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

refs.buttonTheme.addEventListener('click', themeChange);

getStorage();
function getStorage() {
  const themeCheck = localStorage.getItem('Theme:');
  if (themeCheck === null || themeCheck === 'light-theme') {
    setLocalStorage(Theme.LIGHT);
    lightTheme();
  } else if (themeCheck === 'dark-theme') {
    darkTheme();
  }
}

function darkTheme() {
  refs.main.classList.add('darkTheme');
  refs.movieCard.classList.add('darkTheme');
  refs.butTypePopular.classList.add('darkTheme');
  refs.butTypeTop_rated.classList.add('darkTheme');
  refs.butTypeUpcoming.classList.add('darkTheme');
  refs.modalText.classList.add('darkTheme');
  refs.modalBG.classList.add('darkTheme');
  refs.buttonTheme.checked = true;
}

function lightTheme() {
  refs.main.classList.remove('darkTheme');
  refs.movieCard.classList.remove('darkTheme');
  refs.butTypePopular.classList.remove('darkTheme');
  refs.butTypeTop_rated.classList.remove('darkTheme');
  refs.butTypeUpcoming.classList.remove('darkTheme');
  refs.modalText.classList.remove('darkTheme');
  refs.modalBG.classList.remove('darkTheme');
  refs.buttonTheme.checked = false;
}

function themeChange() {
  if (refs.buttonTheme.checked) {
    darkTheme();
    setLocalStorage(Theme.DARK);
  } else {
    lightTheme();
    setLocalStorage(Theme.LIGHT);
  }
}

function setLocalStorage(info) {
  localStorage.setItem('Theme:', info);
}
