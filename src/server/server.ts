import express, { Request, Response } from 'express';
import expressPinoLogger from 'express-pino-logger';

import logger from './logger';

const app = express();
const port = 3000;

export default () => {
  app.use(expressPinoLogger({ logger }));
  app.get('/', (_req: Request, res: Response) => {
    res.send('Hello World!');
  });

  app.listen(port, () => {
    logger.info(`app listening at http://localhost:${port}`);
  });
};
