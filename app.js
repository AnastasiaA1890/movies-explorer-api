const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
require('dotenv').config();

const userRouter = require('./routes/user');
const movieRouter = require('./routes/movie');
const { createUser, login } = require('./controllers/user');
const NotFoundError = require('./errors/NotFoundError');
const { validateRegister, validateLogin } = require('./middlewares/validators');
const error = require('./errors/errors');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors());

app.use(helmet());
app.disable('x-powered-by');
app.use(bodyParser.json());// для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true }));// для приёма веб-страниц внутри POST-запроса

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

app.use(requestLogger);

app.post('/signup', validateRegister, createUser);
app.post('/signin', validateLogin, login);

app.use(auth);

app.use('/users', userRouter);
app.use('/movies', movieRouter);

app.use(errorLogger);

app.use((req, res, next) => {
  next(new NotFoundError('404 - Страницы не существует'));
});

app.use(errors());
app.use(error);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
