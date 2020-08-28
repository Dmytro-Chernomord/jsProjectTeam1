const refs = {
  buttonTheme: document.querySelector('#btn-theme'),
  main: document.querySelector('main'),
  divtheme: document.querySelector('.movie-card'),
  labbel: document.querySelector('#popular'),
  labbel1: document.querySelector('#top_rated'),
  labbel2: document.querySelector('#upcoming'),
  modalText: document.querySelector('.item-data.content-item'),
};
console.log(refs.modalText);

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
    darkTheme();
  } else if (themeCheck === 'dark-theme') {
    darkTheme();
  }
}

function darkTheme() {
  refs.main.classList.toggle('darkTheme');
  refs.divtheme.classList.toggle('darkTheme');
  refs.labbel.classList.toggle('darkTheme');
  refs.labbel1.classList.toggle('darkTheme');
  refs.labbel2.classList.toggle('darkTheme');
  refs.modalText.classList.toggle('darkTheme');

  //   refs.main.classList.remove('light-theme');
  refs.buttonTheme.checked = true;
}

// function lightTheme() {
//   refs.main.classList.remove('darkTheme');
//   //   refs.main.classList.add('light-theme');
// }

function themeChange() {
  if (refs.buttonTheme.checked) {
    darkTheme();
    setLocalStorage(Theme.DARK);
  } else {
    darkTheme();

    // lightTheme();
    setLocalStorage(Theme.LIGHT);
  }
}

function setLocalStorage(info) {
  localStorage.setItem('Theme:', info);
}
