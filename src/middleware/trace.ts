import { type NextFunction, type Request, type Response } from 'express';
import { logger } from '../utils';

const { blue, logGql } = logger;

export function trace(req: Request, res: Response, next: NextFunction) {
  const { body } = req;
  blue('> gql route requested ...');
  logGql(body);
  next();
}
