import express, { Request, Response } from 'express';
import pool from '../../db/pool';

const app = express();

const healthCheck = (req: Request, res: Response) =>
  pool
    .query('SELECT 1')
    .then(() => res.sendStatus(200))
    .catch((error: Error) => res.status(500).json({ message: 'Internal Server Error', error }));

app.get('/', healthCheck);

export default app;
