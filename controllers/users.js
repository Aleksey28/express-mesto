const User = require('../models/user');
const {
  ERROR_WRONG_DATA_CODE,
  ERROR_NOT_FOUND_CODE,
  ERROR_DEFAULT_CODE,
  ERROR_DEFAULT_MESSAGE,
  VALIDATION_ERROR_NAME,
} = require('../utils/constants');

const getUsers = (req, res) => {
  User.find({})
    .then((data) => {
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
      if (error.name === VALIDATION_ERROR_NAME) {
        res.status(ERROR_WRONG_DATA_CODE).send({ message: error.message });
      } else {
        res.status(ERROR_DEFAULT_CODE).send({ message: ERROR_DEFAULT_MESSAGE });
      }
    });
};

module.exports = { getUsers, getUser, createUser };
