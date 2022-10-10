const mongoose = require('mongoose');
const { regex } = require('../const/constants');

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
      validator(link) {
        return regex.test(link);
      },
      message: () => 'Неверный формат ссылки на изображение',
    },
  },
  trailerLink: {
    type: String,
    require: true,
    validate: {
      validator(link) {
        return regex.test(link);
      },
      message: () => 'Неверный формат ссылки на трейлер',
    },
  },
  thumbnail: {
    type: String,
    require: true,
    validate: {
      validator(link) {
        return regex.test(link);
      },
      message: () => 'Неверный формат ссылки на изображение',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
