const express = require('express');

const path = require('path');

const routes = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

app.listen(PORT, () => {
  const _id = 1;
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT} ${_id}`);
});
