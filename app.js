const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cards = require('./routes/cards');
const users = require('./routes/users');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const sendMessageError = (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
};

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '5fd3f4da730a4b61f8e0152c', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});
app.use('/', cards);
app.use('/', users);
app.use(sendMessageError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
