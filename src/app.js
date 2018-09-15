// Load environment

require('dotenv').config();

// Require external libs

const express = require('express');


const app = express();

app.get('/', (req, res) => res.send('Hello World!'))

const server = app.listen(4000, () => console.log('Example app listening on port 3000!'));

module.exports = server;
