// Load environment

require('dotenv').config();

// Require external libs

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const http = require('http');
const io = require('socket.io');

// Require internal libs

const events = require('./events');
const logger = require('./config/winston');

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
const server = http.createServer(app);

app.set('jwtTokenSecret', 'UMUSIC_TOKEN_SECRET');

app.use(bodyParser.json());
app.use(morgan('combined', { stream: logger.stream }));

// Setup passport

require('./middlewares/passport')(passport, app);

app.use(passport.initialize());
app.use(passport.session());

// Routes definition

app.use('/api', require('./routes'));

// Setup socket.io

const socket = io(server);

events(socket);

// Launch server

server.listen(process.env.PORT || 3100, () => logger.info('🚀 Umusic api listening on port 3100 🚀'));

module.exports.server = server;
module.exports.mongoose = mongoose;
