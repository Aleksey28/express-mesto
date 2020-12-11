const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({ message: 'Server was broken =(' });
    });
};
