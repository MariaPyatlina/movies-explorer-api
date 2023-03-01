const Movie = require('../models/movie');
const BadRequestError = require('../error/badRequestError');
const NotFoundError = require('../error/notFoundError');
const ForbiddenError = require('../error/forbiddenError');
const { messages } = require('../utils/constants');

function createMovie(req, res, next) {
  const {
    country, director, duration, year, description, image,
    trailerLink, thumbnail, movieId, nameRU, nameEN,
  } = req.body;
  const userId = req.user._id; // из payload

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: userId,
  })
    .then((movie) => {
      movie.populate('owner')
        .then((movieWithOwner) => {
          res.status(201).send(movieWithOwner);
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(messages.BAD_REQUEST_ERROR_MSG));
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
        throw new NotFoundError(messages.MOVIE_NOT_FOUND_ERROR_MSG);
      }

      if (movie.owner.id !== req.user._id) {
        throw new ForbiddenError(messages.FORBIDDEN_MOVIE_DELETE);
      }

      return movie.remove();
    })
    .then(() => {
      res.status(200).send(messages.MOVIE_DELETED);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(messages.BAD_REQUEST_ERROR_MSG));
      }
      return next(err);
    });
}

module.exports = {
  getSavedMovies,
  createMovie,
  deleteMovie,
};
