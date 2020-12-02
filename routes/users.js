const router = require('express').Router();
const users = require('../data/users.json');

router.get('/users', (req, res) => {
  res.send(users);
});

router.get('/users/:id', (req, res) => {
  const user = users.find((item) => item._id === req.params.id);
  if (!user) {
    res.send({ message: 'Запрашиваемый пользователь не найден' });
    return;
  }
  res.send(user);
});

module.exports = router;
