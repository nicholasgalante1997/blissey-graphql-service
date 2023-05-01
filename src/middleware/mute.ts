import { type NextFunction, type Request, type Response } from 'express';
import { logger } from '../utils';

const { red } = logger;

export function muteTraffic(req: Request, res: Response, next: NextFunction) {
  const { path } = req;
  if (path !== '/graphql') {
    res.status(403).json({ error: 'UnauthorizedRouteException' });
    return;
  }
  next();
}
