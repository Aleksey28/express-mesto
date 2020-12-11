const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((data) => {
      res.send(JSON.parse(data));
    })
    .catch(() => {
      res.status(500).send({ message: 'Server was broken =(' });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(404).send({ message: 'Нет пользователя с таким id' });
    });
};
