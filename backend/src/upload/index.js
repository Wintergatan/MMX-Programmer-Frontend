/* eslint-disable func-names */
/* eslint-disable no-console */
import cors from 'cors';
import express from 'express';
import Busboy from 'busboy';
import Midi from '@tonejs/midi';

const upload = express();
upload.use(
  cors({
    origin: true
  })
);

upload.use((request, response, next) => {
  const busboy = new Busboy({ headers: request.headers });
  const fields = [];
  busboy.on('field', (field, val) => {
    console.log(`Processed field ${field}: ${val}.`);
    fields[field] = val;
  });

  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    console.log(
      `File [${fieldname}]: filename: ${filename}, encoding: ${encoding}, mimetype: ${mimetype}`
    );
    file.on('data', function(data) {
      console.log(`File [${fieldname}] got ${data.length} bytes`);
      request.file = data;
    });
    file.on('end', function() {
      console.log(`File [${fieldname}] Finished`);
    });
  });
  busboy.on('finish', function() {
    next();
  });
  busboy.end(request.rawBody);
});

upload.post('*', (request, response) => {
  console.log('hello');
  const midi = new Midi(request.file);
  response.send(JSON.stringify(midi));
});

module.exports = {
  upload
};
