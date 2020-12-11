const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({ message: 'Server was broken =(' });
    });
};

const getUser = (req, res) => {
  User.findById(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(404).send({ message: 'Нет пользователя с таким id' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(404).send({ message: error });
    });
};

module.exports = { getUsers, getUser, createUser };
