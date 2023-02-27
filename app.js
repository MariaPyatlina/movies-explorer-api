require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;
const { allowedCors } = require('./utils/allowedCors');
const router = require('./routes');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const { handlerError } = require('./middlewares/handlerError');
const { limiter } = require('./middlewares/rateLimit');

const app = express();
app.use(cors(allowedCors));
app.use(helmet());

app.use(express.json());

mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URL);

// Логгирование запросов
app.use(requestLogger);
app.use(limiter);

// Маршруты
app.use(router);

// Обработчики ошибок
app.use(errorLogger); // логгер ошибок
app.use(errors()); // ошибки celebrate
app.use(handlerError);

app.listen(PORT, () => { console.log(`App listening on port ${PORT}`); });
