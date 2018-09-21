// Load environment

require('dotenv').config();

// Require external libs

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./config/winston');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

const authentication = require('./middlewares/authentication')

// Setup mongoose

const mongoUriFromEnv = process.env.TESTING ? 'mongodb://localhost/umusic-test' : process.env.DATABASE_URL;
const mongoUri = mongoUriFromEnv || 'mongodb://localhost/umusic'
mongoose.Promise = Promise;

mongoose.connect(
  mongoUri,
    {
      autoReconnect: true,
      useNewUrlParser: true
    }
  );

// Setup express

const app = express();

app.set('jwtTokenSecret', 'UMUSIC_TOKEN_SECRET');

app.use(bodyParser.json());
app.use(morgan('combined', { stream: logger.stream }));

// Setup passport

require('./middlewares/passport')(passport, app);

app.use(passport.initialize());
app.use(passport.session());

// Routes definition

app.use('/api', require('./routes'));

// Handling errors

app.use((err, req, res, next) => {
  if (err && err.isBoom)
    return res.status(err.output.statusCode).send(err.output.payload);
})


// Launch server

var http = require('http');

const server = http.createServer(app).listen(3100, () => logger.info('Umusic api listening on port 3100'));

module.exports.server = server;
module.exports.mongoose = mongoose;
