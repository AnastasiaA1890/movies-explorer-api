const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
require('dotenv').config();

const route = require('./routes/index');
const error = require('./errors/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const MONGO_DEV_DB = require('./const/constants');

const { NODE_ENV, MONGO_PROD_DB } = process.env;
const { PORT = 3000 } = process.env;

const app = express();

app.use(cors());

app.use(helmet());
app.disable('x-powered-by');
app.use(bodyParser.json());// для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true }));// для приёма веб-страниц внутри POST-запроса

mongoose.connect(NODE_ENV === 'production' ? MONGO_PROD_DB : MONGO_DEV_DB);

app.use(requestLogger);

route(app);

app.use(errorLogger);

app.use(errors());
app.use(error);

app.listen(PORT);
