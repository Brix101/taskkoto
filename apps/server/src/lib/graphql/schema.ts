import { createSchema } from 'graphql-yoga';
import resolvers from './resolvers.js';
import typeDefs from './type-defs.js';
import { GraphQLContext } from './yoga.js';

const schema = createSchema<GraphQLContext>({
  typeDefs,
  resolvers,
});

export default schema;
