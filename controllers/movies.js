const Movie = require('../models/movie');
const BadRequestError = require('../error/badRequestError');
const NotFoundError = require('../error/notFoundError');
const ForbiddenError = require('../error/forbiddenError');
const { errorMessages } = require('../utils/constants');

function createMovie(req, res, next) {
  // const {
  //   country,
  //   director,
  //   duration,
  //   year,
  //   description,
  //   image,
  //   trailerLink,
  //   thumbnail,
  //   owner,
  //   movieId,
  //   nameRU,
  //   nameEN,
  // } = req.body;
  const movieObject = req.body;

  Movie.create(movieObject)
    .then((movie) => {
      movie.populate('owner')
        .then((movieWithOwner) => {
          res.status(201).send(movieWithOwner);
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(`${errorMessages.BAD_REQUEST_ERROR_MSG} Проверьте правильность запроса.`));
      }
      return next(err);
    });
}

function getSavedMovies(req, res, next) {
  Movie.find({}) // Найти всех
    .populate('owner')
    .then((movie) => {
      res.send({ data: movie });
    })
    .catch(next);
}

function deleteMovie(req, res, next) {
  Movie.findById(req.params.movieId)
    .populate('owner')
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError(errorMessages.MOVIE_NOT_FOUND_ERROR_MSG));
      }
      if (movie.owner.id !== req.user._id) {
        return next(new ForbiddenError(`${errorMessages.FORBIDDEN_ERROR_MSG}. Нельзя удалить чужой фильм`));
      }
      return movie;
    })
    .then((movie) => {
      movie.remove();
    })
    .then(() => {
      res.status(200).send({ message: `Фильм ${req.params.movieId} удален из Избранного` });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(errorMessages.BAD_REQUEST_ERROR_MSG));
      }
      return next(err);
    });
}

module.exports = {
  getSavedMovies,
  createMovie,
  deleteMovie,
};
