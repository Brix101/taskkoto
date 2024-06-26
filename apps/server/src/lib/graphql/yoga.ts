import { DBServices } from '@/lib/db.js';
import { getTaskByIds } from '@/modules/tasks/tasks.service.js';
import { getUserByIds } from '@/modules/users/users.service.js';
import Dataloader from 'dataloader';
import { YogaInitialContext, createSchema, createYoga } from 'graphql-yoga';
import resolvers from './resolvers.js';
import typeDefs from './type-defs.js';

const userDataloader = new Dataloader(getUserByIds);
const taskDataloader = new Dataloader(getTaskByIds);

type DataLoaders = {
  userDataloader: typeof userDataloader;
  taskDataloader: typeof taskDataloader;
  // other data loaders go here
};

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
    context: (ctx) => ({ ...ctx, ...dbServices, userDataloader, taskDataloader }),
  });
}
