const Card = require('../models/card');
const {
  ERROR_WRONG_DATA_CODE,
  ERROR_NOT_FOUND_CODE,
  ERROR_DEFAULT_CODE,
  ERROR_DEFAULT_MESSAGE,
  VALIDATION_ERROR_NAME,
} = require('../utils/constants');

const getCards = (req, res) => {
  Card.find({})
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(ERROR_DEFAULT_CODE).send({ message: ERROR_DEFAULT_MESSAGE });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
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

const deleteCard = (req, res) => {
  Card.findOneAndDelete({
    _id: req.params.cardId,
    owner: req.user._id,
  })
    .then((data) => {
      console.log(data);
      if (!data) {
        res.status(ERROR_NOT_FOUND_CODE).send({ message: 'Нет карточки с таким id для текущего пользователя' });
        return;
      }
      res.send(data);
    })
    .catch(() => {
      res.status(ERROR_DEFAULT_CODE).send({ message: ERROR_DEFAULT_MESSAGE });
    });
};

module.exports = { getCards, createCard, deleteCard };
