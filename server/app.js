const express = require('express');
const Sentry = require('@sentry/node');
// const walletRouter = require("./routes/entityRouter"); // create your router

const log = require('loglevel');
const { sentryDSN } = require('../config/config');
const HttpError = require('./utils/HttpError');
const { errorHandler } = require('./utils/utils');
const { handlerWrapper } = require('./utils/utils');
const router = require('./routes');

const app = express();

Sentry.init({ dsn: sentryDSN });

/*
 * Check request
 */
app.use(
  handlerWrapper(async (req, _res, next) => {
    if (
      req.method === 'POST' ||
      req.method === 'PATCH' ||
      req.method === 'PUT'
    ) {
      if (req.headers['content-type'] !== 'application/json') {
        throw new HttpError(
          415,
          'Invalid content type. API only supports application/json',
        );
      }
    }
    next();
  }),
);

app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(express.json()); // parse application/json

// routers
// app.use('/entity', entityRouter);

// paths
// app.get('/entity', asyncHandler(async (req, res, next) => {
//
// }));

// routers
app.use('/', router);

// Global error handler
app.use(errorHandler);

const { version } = require('../package.json');

app.get('*', function (req, res) {
  res.status(200).send(version);
});

module.exports = app;
