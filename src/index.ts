import dotenv from 'dotenv';
import { server } from './server';
import { logger } from './utils';

const APP_NAME = 'blissey-graphql-service';

logger.info(`Starting application: ${APP_NAME}...`);

dotenv.config();

const PORT = process.env.PORT ?? (4000 as const);

function listenerCallback(): void {
  logger.info(`GraphQLServer started on ${PORT} 🚀`);
}

server.listen(PORT, listenerCallback);
