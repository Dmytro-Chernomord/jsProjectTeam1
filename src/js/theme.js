// const refs = {
//   buttonTheme: document.querySelector('#btn-theme'),
//   main: document.querySelector('body'),
//   divtheme: document.querySelector('.movie-card'),
//   label1: document.querySelector('#popular'),
// };
// // console.log(refs.label1);

// const Theme = {
//   LIGHT: 'light-theme',
//   DARK: 'dark-theme',
// };
// refs.buttonTheme.addEventListener('click', themeChange);

// getStorage();
// function getStorage() {
//   const themeCheck = localStorage.getItem('Theme:');
//   if (themeCheck === null || themeCheck === 'light-theme') {
//     setLocalStorage(Theme.LIGHT);
//     lightTheme();
//   } else if (themeCheck === 'dark-theme') {
//     darkTheme();
//   }
// }

// function darkTheme() {
//   refs.main.classList.toggle('darkTheme');
//   refs.divtheme.classList.toggle('darkTheme');
//   document.querySelector('.needcolor').classList.toggle('darkTheme');
//   //   refs.main.classList.remove('light-theme');
//   refs.buttonTheme.checked = true;
// }

// // function lightTheme() {
// //   refs.main.classList.remove('darkTheme');
// //   //   refs.main.classList.add('light-theme');
// // }

// function themeChange() {
//   if (refs.buttonTheme.checked) {
//     darkTheme();
//     setLocalStorage(Theme.DARK);
//   } else {
//     darkTheme();

//     // lightTheme();
//     setLocalStorage(Theme.LIGHT);
//   }
// }

// function setLocalStorage(info) {
//   localStorage.setItem('Theme:', info);
// }
