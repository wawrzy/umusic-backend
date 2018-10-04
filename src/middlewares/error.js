const boom = require('boom');

const asyncErrors = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    if (!err.isBoom) {
      res.status(500).send('Internal');
    }

    res.status(err.output.statusCode).send(err.output.payload);
  });
};

module.exports = asyncErrors;
