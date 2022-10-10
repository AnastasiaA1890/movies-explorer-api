const Movie = require('../models/movie');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const DeclinePermission = require('../errors/DeclinePermission');

const getMovie = (req, res, next) => {
  Movie
    .find({})
    .then((movie) => res.send(movie))
    .catch((err) => {
      next(err);
    });
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner,
      movieId,
      nameRU,
      nameEN,
    })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('400 - Переданы некорректные данные в методы создания фильма'));
        return;
      }
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const movieId = req.params.id;
  Movie
    .findById(movieId)
    .orFail(new NotFoundError('Фильм с указанным _id не найден.'))
    .then((movie) => {
      if (req.user._id !== movie.owner.toString()) {
        next(new DeclinePermission('Чужой фильм нельзя удалить'));
      } else {
        Movie
          .deleteOne(movie)
          .then(() => res.status(200).send({ message: `Фильм с id ${movie.id} успешно удален!` }))
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Ошибка в запросе.'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovie,
  createMovie,
  deleteMovie,
};
