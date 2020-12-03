const router = require('express').Router();
const path = require('path');
const fsPromise = require('fs').promises;

const dataPath = path.join(__dirname, '../data/userss.json');

router.get('/users', (req, res) => {
  fsPromise.readFile(dataPath, { encoding: 'utf8' })
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({ message: 'Server was broken =(' });
    });
});

router.get('/users/:id', (req, res) => {
  fsPromise.readFile(dataPath, { encoding: 'utf8' })
    .then((data) => {
      const user = JSON.parse(data).find((item) => item._id === req.params.id);
      if (!user) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
        return;
      }
      res.send(user);
    })
    .catch(() => {
      res.status(500).send({ message: 'Server was broken =(' });
    });
});

module.exports = router;
