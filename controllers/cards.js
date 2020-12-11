const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({ message: 'Server was broken =(' });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({ message: 'Server was broken =(' });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({ message: 'Server was broken =(' });
    });
};

module.exports = { getCards, createCard, deleteCard };
