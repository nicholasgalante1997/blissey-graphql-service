import pino from 'pino';

export const logger = pino({
  level: 'info',
  name: 'blissey-logger',
  base: undefined,
});
