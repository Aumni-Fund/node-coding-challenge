import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

export default () => {
  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({
      message: 'Ok',
    });
  });

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.info(`app listening at http://localhost:${port}`);
  });
};
