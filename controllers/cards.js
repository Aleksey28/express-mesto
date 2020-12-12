const Card = require('../models/card');
const {
  ERROR_NOT_FOUND_CODE,
} = require('../utils/constants');
const {
  sendError,
} = require('../utils/functions');

const getCards = (req, res) => {
  Card.find({})
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      sendError(res);
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      sendError(res, error);
    });
};

const deleteCard = (req, res) => {
  Card.findOneAndDelete({
    _id: req.params.cardId,
    owner: req.user._id,
  })
    .then((data) => {
      if (!data) {
        const errorMessage = 'Нет карточки с таким id для текущего пользователя';
        sendError(res, errorMessage, ERROR_NOT_FOUND_CODE);
        return;
      }
      res.send(data);
    })
    .catch(() => {
      sendError(res);
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((data) => {
      if (!data) {
        const errorMessage = 'Нет карточки с таким id';
        sendError(res, errorMessage, ERROR_NOT_FOUND_CODE);
      }
      res.send(data);
    })
    .catch(() => {
      sendError(res);
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((data) => {
      if (!data) {
        const errorMessage = 'Нет карточки с таким id';
        sendError(res, errorMessage, ERROR_NOT_FOUND_CODE);
      }
      res.send(data);
    })
    .catch(() => {
      sendError(res);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
