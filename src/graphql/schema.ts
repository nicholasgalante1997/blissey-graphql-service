import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';

const GqlHealthCheckSchemaType = new GraphQLObjectType<any, any>({
  name: 'GqlHealthCheck',
  fields: () => ({
    status: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType<any, any>({
  name: 'RootQueryType',
  fields: () => ({
    healthCheck: {
      type: GqlHealthCheckSchemaType,
      resolve(parentValue, args) {
        return { status: 'GraphQLServer Status Healthy' };
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

export { schema };
