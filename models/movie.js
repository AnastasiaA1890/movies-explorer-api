const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {

    },
  },
  trailerLink: {

  },
  thumbnail: {

  },
  owner: {

  },
  movieId: {

  },
  nameRU: {

  },
  nameEN: {

  },
});

module.exports = mongoose.model('movie', movieSchema);