const express = require('express');

const app = express();
const cors = require('cors');
// const morgan = require('morgan');
const mongoose = require('mongoose');
const middleware = require('./utils/middleware');
const config = require('./utils/config');
const logger = require('./utils/logger');
const blogsRouter = require('./controllers/blogs');

const { MONGODB_URI } = config;
mongoose.connect(MONGODB_URI).then(() => logger.info('Success in DB connection')).catch(() => logger.info('Failed to connect to DB'));

app.use(cors());
// app.use(morgan('tiny'));
app.use(express.json());
app.use(middleware.requestLogger);
app.use('/api/blogs', blogsRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
