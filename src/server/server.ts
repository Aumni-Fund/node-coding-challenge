import app from './app';

const port = 3000;

export default async () =>
  app.listen(port, () => {
    console.info(`app listening at http://localhost:${port}`);
  });
