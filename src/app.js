const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const YAML = require('yaml');
const swaggerUi = require('swagger-ui-express');

const env = require('./config/env');
const logger = require('./utils/logger');
const rateLimiter = require('./middlewares/rateLimiter');
const routes = require('./routes');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const swaggerSpecPath = path.join(__dirname, '../docs/openapi.yaml');
const swaggerSpec = YAML.parse(fs.readFileSync(swaggerSpecPath, 'utf8'));

app.use(helmet());
app.use(cors({ origin: env.corsOrigin }));
app.use(express.json());
app.use(logger);
app.use(rateLimiter);

app.use(routes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(notFound);
app.use(errorHandler);

module.exports = app;
