const movieRouter = require('express').Router();

const { getMovie, createMovie, deleteMovie } = require('../controllers/movie');
const { validateCreateMovie, validateMovieId } = require('../middlewares/validators');

movieRouter.get('/', getMovie);
movieRouter.post('/', validateCreateMovie, createMovie);
movieRouter.delete('/:id', validateMovieId, deleteMovie);

module.exports = movieRouter;
