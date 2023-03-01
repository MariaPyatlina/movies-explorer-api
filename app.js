require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const helmet = require('./node_modules/helmet'); // Должен стоять после celebrate

const { allowedCors } = require('./utils/allowedCors');
const { appConfig } = require('./utils/appConfig');
const router = require('./routes');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const { handlerError } = require('./middlewares/handlerError');
const { limiter } = require('./middlewares/rateLimit');

const app = express();
app.use(cors(allowedCors));
app.use(helmet());

app.use(express.json());

mongoose.set('strictQuery', false);
mongoose.connect(appConfig.MONGO_URL);

// Логгирование запросов
app.use(requestLogger);
app.use(limiter);

// Маршруты
app.use(router);

// Обработчики ошибок
app.use(errorLogger); // логгер ошибок
app.use(errors()); // ошибки celebrate
app.use(handlerError);

app.listen(appConfig.PORT, () => {
  console.log(`App listening on port ${appConfig.PORT}`);
});
