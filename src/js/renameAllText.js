import refs from './refs';

export default function renameAllText(languege) {
  if (languege === 'ru-RU') {
    refs.home.textContent = 'Дом';
    refs.myLib.textContent = 'Библиотека';
    refs.input.setAttribute('placeholder', 'Найди свой фильм!');
    refs.notification.textContent =
      'Результат поиска не удался. Введите правильное название фильма';
    refs.watchedBtn.textContent = 'Посмотрел';
    refs.queueBtn.textContent = 'Очередь';

    refs.butTypePopular.textContent = 'Популярное';
    refs.butTypeTop_rated.textContent = 'Рейтинговое';
    refs.butTypeUpcoming.textContent = 'Уже скоро';

    refs.error.textContent = 'Что то пошло не так =(';
    refs.info.textContent =
      'Этот список пока пуст! Попробуй что-нибудь добавить! ;)';
  }
  if (languege === 'en-US') {
    refs.home.textContent = 'Home';
    refs.myLib.textContent = 'My library';
    refs.input.setAttribute('placeholder', 'Find your movie!');
    refs.notification.textContent =
      'Search result not successful. Enter the correct movie name';
    refs.watchedBtn.textContent = 'Watched';
    refs.queueBtn.textContent = 'Queue';

    refs.butTypePopular.textContent = 'Popular';
    refs.butTypeTop_rated.textContent = 'Top rated';
    refs.butTypeUpcoming.textContent = 'Upcoming';

    refs.info.textContent = 'Something went wrong = (';
    refs.info.textContent =
      'This list is still empty! Try to add something in it! ;)';
  }
}
