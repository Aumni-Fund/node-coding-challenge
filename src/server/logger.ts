import pino from 'pino';

const logger = pino({
  name: 'node-coding-challenge',
  level: process.env.LOG_LEVEL ?? 'info',
  transport: {
    target: 'pino-pretty',
  },
});

export default logger;
