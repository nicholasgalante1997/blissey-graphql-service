import { type NextFunction, type Request, type Response } from 'express';
import { logger } from '../utils';

export function trace(req: Request, res: Response, next: NextFunction) {
  const { body } = req;
  logger.info('> gql route requested ...');
  logger.info(body);
  next();
}
