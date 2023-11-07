const app = require('./app');
// const express = require('express');
// const app = express();
const config = require('./utils/config');
const logger = require('./utils/logger');

const { PORT } = config;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
