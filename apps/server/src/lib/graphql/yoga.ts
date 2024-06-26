import { DBServices } from '@/lib/db.js';
import { YogaInitialContext, createSchema, createYoga } from 'graphql-yoga';
import resolvers from './resolvers.js';
import typeDefs from './type-defs.js';
import { DataLoaders, dataLoaders } from './dataloader.js';

export type ServerContext = Record<string, any>;
type SchemaContext = ServerContext & DBServices & DataLoaders;
export type GraphQLContext = YogaInitialContext & SchemaContext;

const schema = createSchema<SchemaContext>({
  typeDefs,
  resolvers,
});

export function initializeYoga(dbServices: DBServices) {
  return createYoga<ServerContext, GraphQLContext>({
    schema,
    graphiql: true,
    context: (ctx) => ({ ...ctx, ...dbServices, ...dataLoaders }),
  });
}
