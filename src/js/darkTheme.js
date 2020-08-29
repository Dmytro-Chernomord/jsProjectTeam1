const refs = {
  buttonTheme: document.querySelector('#btn-theme'),
  main: document.querySelector('main'),
  divtheme: document.querySelector('.movie-card'),
  labbel: document.querySelector('#popular'),
  labbel1: document.querySelector('#top_rated'),
  labbel2: document.querySelector('#upcoming'),
  modalText: document.querySelector('.modal-card'),
  // modalCross: document.querySelector('.close'),
  modalBG: document.querySelector('.backdrop'),
};

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};
// refs.buttonTheme.addEventListener('click', themeChange);

// function themeChange() {
//   refs.main.classList.toggle('darkTheme');
//   refs.divtheme.classList.toggle('darkTheme');
//   refs.labbel.classList.toggle('darkTheme');
//   refs.labbel1.classList.toggle('darkTheme');
//   refs.labbel2.classList.toggle('darkTheme');
//   refs.modalText.classList.toggle('darkTheme');
//   refs.modalCross.classList.toggle('darkTheme');
//   refs.modalBG.classList.toggle('darkTheme');
// }

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
  refs.divtheme.classList.add('darkTheme');
  refs.labbel.classList.add('darkTheme');
  refs.labbel1.classList.add('darkTheme');
  refs.labbel2.classList.add('darkTheme');
  refs.modalText.classList.add('darkTheme');
  // refs.modalCross.classList.add('darkTheme');
  refs.modalBG.classList.add('darkTheme');
  // refs.body.classList.add('dark-theme');
  // refs.body.classList.remove('light-theme');
  refs.buttonTheme.checked = true;
}

function lightTheme() {
  refs.main.classList.remove('darkTheme');
  refs.divtheme.classList.remove('darkTheme');
  refs.labbel.classList.remove('darkTheme');
  refs.labbel1.classList.remove('darkTheme');
  refs.labbel2.classList.remove('darkTheme');
  refs.modalText.classList.remove('darkTheme');
  // refs.modalCross.classList.remove('darkTheme');
  refs.modalBG.classList.remove('darkTheme');
  // refs.body.classList.remove('dark-theme');
  // refs.body.classList.add('light-theme');
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
