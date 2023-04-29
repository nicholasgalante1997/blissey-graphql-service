import dotenv from 'dotenv';
import { server } from './server';

dotenv.config();

const PORT = process.env.PORT ?? (4000 as const);

function listenerCallback(): void {
  console.log(`GraphQLServer started on ${PORT} 🚀`);
}

server.listen(PORT, listenerCallback);
