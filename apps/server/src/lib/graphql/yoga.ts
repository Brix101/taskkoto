import { DBServices } from '@/db.js';
import { getUserByIds } from '@/modules/users/users.service.js';
import Dataloader from 'dataloader';
import { YogaInitialContext, createSchema, createYoga } from 'graphql-yoga';
import resolvers from './resolvers.js';
import typeDefs from './type-defs.js';

const userDataloader = new Dataloader(getUserByIds);

type ServicesLoader = DBServices & {
  userDataloader: typeof userDataloader;
};

export type GraphQLContext = YogaInitialContext & ServicesLoader;

export type ServerContext = Record<string, any>;

const schema = createSchema<ServicesLoader>({
  typeDefs,
  resolvers,
});

export function initializeYoga(dbServices: DBServices) {
  return createYoga<ServerContext, GraphQLContext>({
    schema,
    graphiql: true,
    context: (ctx) => ({ ...ctx, ...dbServices, userDataloader }),
  });
}
