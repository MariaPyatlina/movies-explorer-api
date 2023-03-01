const messages = {
  SERVER_ERROR_MSG: 'На сервере произошла ошибка',
  BAD_REQUEST_ERROR_MSG: 'Переданы некорректные данные',
  USER_NOT_FOUND_ERROR_MSG: 'Пользователь c указанным ID не найден',
  MOVIE_NOT_FOUND_ERROR_MSG: 'Фильм c указанным ID найден',
  UNAUTHORIZED_ERROR_MSG: 'Необходима авторизация',
  FORBIDDEN_ERROR_MSG: 'Ошибка доступа',
  FORBIDDEN_MOVIE_DELETE: 'Нельзя удалить чужой фильм',
  PAGE_NOT_FOUND_ERROR_MSG: 'Некорректный URL. Проверьте правильность запроса.',
  NOT_UNIC_USER: 'Пользователь с таким email уже существует',
  WRONG_LINK_FORMAT: 'Неправильный формат ссылки',
  WRONG_EMAIL_FORMAT: 'Неправильный формат почты',
  WRONG_LOGIN_PASSWORD_DATA: 'Неправильная пара логин-пароль',
  MOVIE_DELETED: 'Фильм удален из Избранного',
};

// const secrets = {
//   SECRET_PHRASE: 'Some_secret_phrase',
// };

module.exports = {
  messages,
  // secrets,
};
