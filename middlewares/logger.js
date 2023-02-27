const winston = require('winston');
const expressWinston = require('express-winston');

const requestLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: 'request.log' })], // куда нужно писать лог
  format: winston.format.json(), // в каком формате
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
});

module.exports = { requestLogger, errorLogger };
