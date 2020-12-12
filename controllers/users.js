const User = require('../models/user');

const ERROR_WRONG_DATA_CODE = 400;
const ERROR_NOT_FOUND_CODE = 404;
const ERROR_DEFAULT_CODE = 500;

const ERROR_DEFAULT_MESSAGE = 'Server was broken =(';

const VALIDATION_ERROR_NAME = 'ValidationError';

const getUsers = (req, res) => {
  User.find({})
    .then((data) => {
      if (data.length <= 0) {
        res.status(ERROR_NOT_FOUND_CODE).send({ message: 'Список пользователей пуст' });
        return;
      }
      res.send(data);
    })
    .catch(() => {
      res.status(ERROR_DEFAULT_CODE).send({ message: ERROR_DEFAULT_MESSAGE });
    });
};

const getUser = (req, res) => {
  User.findById(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(ERROR_NOT_FOUND_CODE).send({ message: 'Нет пользователя с таким id' });
        return;
      }
      res.send(data);
    })
    .catch(() => {
      res.status(ERROR_DEFAULT_CODE).send({ message: ERROR_DEFAULT_MESSAGE });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error.name);
      if (error.name === VALIDATION_ERROR_NAME) {
        res.status(ERROR_WRONG_DATA_CODE).send({ message: error.message });
      } else {
        res.status(ERROR_DEFAULT_CODE).send({ message: ERROR_DEFAULT_MESSAGE });
      }
    });
};

module.exports = { getUsers, getUser, createUser };
