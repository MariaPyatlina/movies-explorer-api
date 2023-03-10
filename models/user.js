const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { messages } = require('../utils/constants');

const UnauthorizedError = require('../error/unauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    validate: [validator.isEmail, messages.WRONG_EMAIL_FORMAT],
  },
  password: {
    type: String,
    require: true,
    select: false, // чтобы не возращал пароль в запросах
  },
}, {
  versionKey: false,
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(messages.WRONG_LOGIN_PASSWORD_DATA));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(messages.WRONG_LOGIN_PASSWORD_DATA));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
