import refs from './refs';

export default function renameAllText(languege) {
  if (languege === 'ru-RU') {
    refs.home.textContent = 'Главная';
    refs.myLib.textContent = 'Избранное';
    refs.input.setAttribute('placeholder', 'Введите Ваш запрос');
    refs.notification.textContent =
      'Нет результатов по Вашему запросу. Введите корректное название фильма';
    refs.watchedBtn.textContent = 'Просмотренное';
    refs.queueBtn.textContent = 'Отложенные';

    refs.butTypePopular.textContent = 'Популярное';
    refs.butTypeTop_rated.textContent = 'Рейтинговое';
    refs.butTypeUpcoming.textContent = 'Скоро в прокате';

    refs.error.textContent = 'Что то пошло не так =(';
    refs.infoText.textContent =
      'Судя по всему, Вы ещё ничего не добавили в этот список. Самое время начать!';
    refs.modalLib.textContent = 'Избранное';
    refs.modalHome.textContent = 'Главная';
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

    refs.error.textContent = 'Something went wrong = (';
    refs.infoText.textContent =
      'Seems like you haven`t add anything in this list yet. Right about time to start! ';
  }
}
