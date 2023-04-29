import cors from 'cors';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { createServer } from 'http';
import { schema } from './graphql';
import { muteTraffic, trace } from './middleware';

const expressApp = express();

/** Middleware */
expressApp.use(cors());
expressApp.use(express.json());
expressApp.use(muteTraffic);
expressApp.use(trace);

/** GraphQL Layer */
expressApp.all('/graphql', graphqlHTTP({ schema, graphiql: true }));

export const server = createServer(expressApp);
