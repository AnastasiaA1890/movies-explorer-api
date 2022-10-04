const bcrypt = require('bcryptjs');
const User = require('../models/user');
const ConflictError = require('../errors/ConflictError');
const ValidationError = require('../errors/ValidationError');

const getUser = (req, res, next) => {
  User.find({})
    .then((user) => {
      res.send(user)
    })
    .catch(next)
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      res.send(user)
    })
    .catch(next)
}

const updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  console.log(req)
  User
    .findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .then((user) => {
      console.log(req.user)
      res.send(user)
    })
  .catch((err) => {
    next(err)
  })
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then(hash => User.create({
      name, email, password: hash,
    })
      .then((user) => {
        res.status(201).send({
          name: user.name,
          email: user.email,
        });
      })
      .catch((err) => {
        console.log(err.name);
        if (err.code === 11000) {
          next(new ConflictError('409 - Пользователь с такой почтой уже существует'));
        } else if (err.name === 'ValidationError') {
          next(new ValidationError('400 - Переданы некорректные данные при создании пользователя'));
        } else {
          next(err);
        }
      }));
};

module.exports = {
  getUser,
  updateUserInfo,
  getUserById,
  createUser,
}
