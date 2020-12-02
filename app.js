const express = require('express');

const { PORT = 3000 } = process.env;
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  const _id = 1;
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT} ${_id}`);
});
