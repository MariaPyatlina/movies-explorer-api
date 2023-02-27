const mongoose = require('mongoose');

const { LINK_REGEX } = require('../utils/regularExpressions');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    require: true,
    default: '-',
  }, // страна создания фильма. Обязательное поле-строка.
  director: {
    type: String,
    require: true,
    default: '-',
  }, // — режиссёр фильма. Обязательное поле-строка.
  duration: {
    type: Number,
    require: true,
    default: '-',
  }, // — длительность фильма. Обязательное поле-число.
  year: {
    type: String,
    require: true,
    default: '-',
  }, // — год выпуска фильма. Обязательное поле-строка.
  description: {
    type: String,
    require: true,
    default: '-',
  }, // — описание фильма. Обязательное поле-строка.
  image: {
    type: String,
    require: true,
    default: 'https://cdn3.iconfinder.com/data/icons/font-awesome-regular-1/512/file-video-512.png',
    validate: {
      validator(v) {
        return LINK_REGEX.test(v);
      },
      message: (props) => `${props.value} неправильный формат ссылки`,
    },
  }, // — ссылка на постер к фильму. Обязательное поле-строка. Запишите её URL-адресом.
  trailerLink: {
    type: String,
    require: true,
    default: 'https://cdn3.iconfinder.com/data/icons/font-awesome-regular-1/512/file-video-512.png',
    validate: {
      validator(v) {
        return LINK_REGEX.test(v);
      },
      message: (props) => `${props.value} неправильный формат ссылки`,
    },
  }, // — ссылка на трейлер фильма.Обязательное поле- строка.Запишите её URL - адресом.
  thumbnail: {
    type: String,
    require: true,
    default: 'https://cdn3.iconfinder.com/data/icons/font-awesome-regular-1/512/file-video-512.png',
    validate: {
      validator(v) {
        return LINK_REGEX.test(v);
      },
      message: (props) => `${props.value} неправильный формат ссылки`,
    },
  }, // — миниатюрное изобр постера к фильму.Обязательное поле - строка.Запишите её URL - адресом.
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  }, // — _id пользователя, который сохранил фильм.Обязательное поле.
  movieId: { // TODO понять какие данные придут
    type: Number,
    required: true,
    default: '-',
  }, // — id фильма, который содержится в ответе сервиса MoviesExplorer.Обязательное поле.
  nameRU: {
    type: String,
    require: true,
    default: '-',
  }, // — название фильма на русском языке. Обязательное поле-строка.
  nameEN: {
    type: String,
    require: true,
    default: '-',
  }, // — название фильма на английском языке. Обязательное поле-строка.
}, {
  versionKey: false,
});

module.exports = mongoose.model('movie', movieSchema);
