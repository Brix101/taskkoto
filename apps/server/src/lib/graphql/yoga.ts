import { DBServices } from '@/db.js';
import { Connection, EntityManager, IDatabaseDriver } from '@mikro-orm/core';
import { YogaInitialContext, createSchema, createYoga } from 'graphql-yoga';
import resolvers from './resolvers.js';
import typeDefs from './type-defs.js';

export type GraphQLContext = YogaInitialContext & {
  em: EntityManager<IDatabaseDriver<Connection>>;
};

export type ServerContext = {};

const schema = createSchema<GraphQLContext>({
  typeDefs,
  resolvers,
});

export function initializeYoga(db: DBServices) {
  return createYoga<ServerContext, GraphQLContext>({
    schema,
    graphiql: true,
    context: (ctx) => ({ ...ctx, em: db.em }),
  });
}
