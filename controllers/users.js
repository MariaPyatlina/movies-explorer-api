const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const BadRequestError = require('../error/badRequestError');
const ConflictError = require('../error/conflictError');
const NotFoundError = require('../error/notFoundError');

const { messages } = require('../utils/constants');
const { appConfig } = require('../utils/appConfig');

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
        return next(new BadRequestError(messages.BAD_REQUEST_ERROR_MSG));
      }

      if (err.code === 11000) {
        return next(new ConflictError(messages.NOT_UNIC_USER));
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
        appConfig.JWT_SECRET,
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
      if (!user) { throw new NotFoundError(messages.USER_NOT_FOUND_ERROR_MSG); }

      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(messages.BAD_REQUEST_ERROR_MSG));
      }
      return next(err);
    });
}

function updateUserInfo(req, res, next) {
  const userId = req.user._id;
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, email },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: false, // если пользователь не найден, он будет создан
    },
  )
    .then((user) => {
      if (!user) { throw new NotFoundError(messages.USER_NOT_FOUND_ERROR_MSG); }

      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(messages.BAD_REQUEST_ERROR_MSG));
      }

      if (err.code === 11000) {
        return next(new ConflictError(messages.NOT_UNIC_USER));
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
