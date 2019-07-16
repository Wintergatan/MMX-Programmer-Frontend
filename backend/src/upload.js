const cors = require('cors');
const express = require('express');

const upload = express();
upload.use(
  cors({
    origin: true
  })
);
upload.get('*', (request, response) => {
  console.log('hello');
  response.send('Hello World!');
});

module.exports = {
  upload
};
