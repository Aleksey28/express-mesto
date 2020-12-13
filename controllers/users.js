const User = require('../models/user');
const {
  ERROR_NOT_FOUND_CODE,
} = require('../utils/constants');
const {
  sendError,
} = require('../utils/functions');

const getUsers = (req, res) => {
  User.find({})
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      sendError(res);
    });
};

const getUser = (req, res) => {
  User.findById(req.params.id)
    .then((data) => {
      if (!data) {
        const errorMessage = 'Нет пользователя с таким id';
        sendError(res, errorMessage, ERROR_NOT_FOUND_CODE);
        return;
      }
      res.send(data);
    })
    .catch(() => {
      sendError(res);
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      sendError(res, error);
    });
};

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((data) => {
      if (!data) {
        const errorMessage = 'Нет пользователя с таким id';
        sendError(res, errorMessage, ERROR_NOT_FOUND_CODE);
        return;
      }
      res.send(data);
    })
    .catch((error) => {
      sendError(res, error);
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((data) => {
      if (!data) {
        const errorMessage = 'Нет пользователя с таким id';
        sendError(res, errorMessage, ERROR_NOT_FOUND_CODE);
        return;
      }
      res.send(data);
    })
    .catch((error) => {
      sendError(res, error);
    });
};
module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
