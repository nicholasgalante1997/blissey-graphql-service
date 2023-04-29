import cors from 'cors';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { createServer } from 'http';
import { schema } from './graphql';

const expressApp = express();

/** Middleware */
expressApp.use(cors());

/** GraphQL Layer */
expressApp.all('/graphql', graphqlHTTP({ schema, graphiql: true }));

export const server = createServer(expressApp);
