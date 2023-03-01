const router = require('express').Router();
const {
  verificationMovieData,
  verificationMovieId,
} = require('../utils/celebrateVerification');
const {
  getSavedMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

// возвращает все сохранённые текущим  пользователем фильмы
router.get('/', getSavedMovies);

//  создаёт фильм с переданными в теле полями
router.post('/', verificationMovieData, createMovie);

//  удаляет сохранённый фильм по id
router.delete('/:movieId', verificationMovieId, deleteMovie);

module.exports = router;
