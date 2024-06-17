import { DBServices } from '@/db.js';
import { YogaInitialContext, createSchema, createYoga } from 'graphql-yoga';
import resolvers from './resolvers.js';
import typeDefs from './type-defs.js';

export type GraphQLContext = YogaInitialContext & DBServices;

export type ServerContext = Record<string, any>;

const schema = createSchema<DBServices>({
  typeDefs,
  resolvers,
});

export function initializeYoga(dbServices: DBServices) {
  return createYoga<ServerContext, GraphQLContext>({
    schema,
    graphiql: true,
    context: (ctx) => ({ ...ctx, ...dbServices }),
  });
}
