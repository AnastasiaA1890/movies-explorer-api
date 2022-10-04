const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');

const userRouter = require('./routes/user');
const { createUser } = require('./controllers/user');
const { validateSignUp } = require('./middlewares/validators');
const error = require('./errors/errors');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

const app = express();

app.use(cors());

app.use(bodyParser.json());// для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true }));// для приёма веб-страниц внутри POST-запроса

app.post('/signup', validateSignUp, createUser);

app.use('/users', userRouter);

app.use(errors());
app.use(error);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
