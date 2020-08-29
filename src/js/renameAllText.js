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
    refs.infoText.textContent =
      'Судя по всему, Вы ещё ничего не добавили в этот список. Самое время начать!';
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
