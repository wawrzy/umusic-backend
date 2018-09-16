// Load environment

require('dotenv').config();

// Require external libs

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./config/winston');
const morgan = require('morgan');

// Setup express

const app = express();

app.use(bodyParser.json());
app.use(morgan('combined', { stream: logger.stream }));

// Routes definition


app.use('/api', require('./routes'));

// Launch server

const server = app.listen(3100, () => logger.info('Umusic api listening on port 3100'));

module.exports = server;
