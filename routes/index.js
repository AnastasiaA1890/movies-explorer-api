const { celebrate, Joi } = require('celebrate');
const { createUser, login } = require('../controllers/user');
const { isAuthorized } = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const userRouter = require('./user');
const movieRouter = require('./movie');

module.exports = (app) => {
  app.use('/signup', celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }), createUser);

  app.use('/signin', celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }), login);

  app.use('/users', isAuthorized, userRouter);
  app.use('/movies', isAuthorized, movieRouter);

  app.use((req, res, next) => {
    next(new NotFoundError('404 - Страницы не существует'));
  });
};
