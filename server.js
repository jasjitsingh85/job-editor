const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();
const jobsRouter = require('./jobsRouter');
app.use(express.static('public'));

app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');
const {Job} = require('./models');

app.use('/jobs', jobsRouter);

let server;
function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }

    server = app.listen(port, () => {
      console.log(`Your app is listening on port ${port}`);
      resolve(server);
      }).on('error', err => {
        mongoose.disconnect();
        reject(err)
      });
    });
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        // so we don't also call `resolve()`
        return;
      }
      resolve();
    });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};