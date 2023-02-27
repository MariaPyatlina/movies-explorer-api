const errorMessages = {
  SERVER_ERROR_MSG: 'На сервере произошла ошибка',
  BAD_REQUEST_ERROR_MSG: 'Переданы некорректные данные',
  USER_NOT_FOUND_ERROR_MSG: 'Пользователь c указанным ID не найден',
  MOVIE_NOT_FOUND_ERROR_MSG: 'Фильм c указанным ID найден',
  UNAUTHORIZED_ERROR_MSG: 'Необходима авторизация',
  FORBIDDEN_ERROR_MSG: 'Ошибка доступа',
  PAGE_NOT_FOUND_ERROR_MSG: 'Некорректный URL',
};

const secrets = {
  SECRET_PHRASE: 'Some_secret_phrase',
};

module.exports = {
  errorMessages,
  secrets,
};
