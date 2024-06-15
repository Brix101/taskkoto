import { DBServices } from '@/db.js';
import { Connection, EntityManager, IDatabaseDriver } from '@mikro-orm/core';
import { YogaInitialContext, createYoga } from 'graphql-yoga';
import schema from './schema.js';

export type GraphQLContext = YogaInitialContext & {
  em: EntityManager<IDatabaseDriver<Connection>>;
};

export type ServerContext = {};

export function initializeYoga(db: DBServices) {
  return createYoga<ServerContext, GraphQLContext>({
    schema,
    graphiql: true,
    context: (ctx) => ({ ...ctx, em: db.em }),
  });
}
