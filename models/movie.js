const mongoose = require('mongoose');

const { LINK_REGEX } = require('../utils/regularExpressions');
const { messages } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: { // страна создания фильма. Обязательное поле-строка.
    type: String,
    require: true,
  },
  director: { // — режиссёр фильма. Обязательное поле-строка.
    type: String,
    require: true,
  },
  duration: { // — длительность фильма. Обязательное поле-число.
    type: Number,
    require: true,
  },
  year: { // — год выпуска фильма. Обязательное поле-строка.
    type: String,
    require: true,
  },
  description: { // — описание фильма. Обязательное поле-строка.
    type: String,
    require: true,
  },
  image: { // — ссылка на постер к фильму. Обязательное поле-строка. Запишите её URL-адресом.
    type: String,
    require: true,
    validate: {
      validator(v) {
        return LINK_REGEX.test(v);
      },
      message: (props) => `${props.value} ${messages.WRONG_LINK_FORMAT}`,
    },
  },
  trailerLink: { // — ссылка на трейлер фильма.Обязательное поле- строка.Запишите её URL - адресом.
    type: String,
    require: true,
    validate: {
      validator(v) {
        return LINK_REGEX.test(v);
      },
      message: (props) => `${props.value} ${messages.WRONG_LINK_FORMAT}`,
    },
  },
  thumbnail: { // — миниатюрное изобр постера к фильму.Обязат поле - строка. URL - адресом.
    type: String,
    require: true,
    validate: {
      validator(v) {
        return LINK_REGEX.test(v);
      },
      message: (props) => `${props.value} ${messages.WRONG_LINK_FORMAT}`,
    },
  },
  owner: { // — _id пользователя, который сохранил фильм.Обязательное поле.
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: { // — id фильма, кот-й содерж в ответе сервиса MoviesExplorer.Обязательное поле. Число
    type: Number,
    required: true,
  },
  nameRU: { // — название фильма на русском языке. Обязательное поле-строка.
    type: String,
    require: true,
  },
  nameEN: { // — название фильма на английском языке. Обязательное поле-строка.
    type: String,
    require: true,
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('movie', movieSchema);
