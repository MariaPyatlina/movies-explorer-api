const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const BadRequestError = require('../error/badRequestError');
const ConflictError = require('../error/conflictError');
const NotFoundError = require('../error/notFoundError');

const { NODE_ENV, JWT_SECRET } = process.env;
const { errorMessages, secrets } = require('../utils/constants');

function createUser(req, res, next) {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      const userObject = user.toObject();
      delete userObject.password;
      res.status(200).send(userObject); // не передаем пароль в ответе
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(`${errorMessages.BAD_REQUEST_ERROR_MSG} Проверьте правильность запроса.`));
      }

      if (err.code === 11000) {
        return next(new ConflictError('Неуникальный email'));
      }
      return next(err);
    });
}

function login(req, res, next) {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : secrets.SECRET_PHRASE,
        { expiresIn: '7d' },
      );

      res.status(200).send({ messsage: 'success', token });
    })
    .catch(next);
}

function getUserInfo(req, res, next) {
  const userId = req.user._id; // берем из payload при авторизации
  User.findById(userId)
    .then((user) => {
      if (!user) { return next(new NotFoundError(errorMessages.USER_NOT_FOUND_ERROR_MSG)); }

      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(errorMessages.BAD_REQUEST_ERROR_MSG));
      }
      return next(err);
    });
}

function updateUserInfo(req, res, next) {
  const userId = req.user._id;
  const { name, email } = req.body;

  User.findById(userId, { name, email })
    .then((user) => {
      if (!user) { return next(new NotFoundError(errorMessages.USER_NOT_FOUND_ERROR_MSG)); }

      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(errorMessages.BAD_REQUEST_ERROR_MSG));
      }
      return next(err);
    });
}

module.exports = {
  createUser,
  login,
  getUserInfo,
  updateUserInfo,
};
