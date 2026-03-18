import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import swaggerUi from 'swagger-ui-express';

import env from './config/env';
import logger from './utils/logger';
import rateLimiter from './middlewares/rateLimiter';
import routes from './routes';
import notFound from './middlewares/notFound';
import errorHandler from './middlewares/errorHandler';

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

export default app;
