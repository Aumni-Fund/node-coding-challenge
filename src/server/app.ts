import express, { json, urlencoded } from 'express';
import healthCheckRoutes from './routes/healthCheck';
import fundRoutes from './routes/funds';

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/health', healthCheckRoutes);
app.use('/funds', fundRoutes);

export default app;
