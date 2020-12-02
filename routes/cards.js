const router = require('express').Router();
const path = require('path');
const fsPromise = require('fs').promises;

const dataPath = path.join(__dirname, '../data/cards.json');

router.get('/cards', (req, res) => {
  fsPromise
    .readFile(dataPath, { encoding: 'utf8' })
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({ message: 'Server was broken =(' });
    });
});

module.exports = router;
