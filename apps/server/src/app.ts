import { makeExecutableSchema } from "@graphql-tools/schema";
import {
  Connection,
  EntityManager,
  IDatabaseDriver,
  MikroORM,
} from "@mikro-orm/core";
import express from "express";
import {
  YogaInitialContext,
  createGraphQLError,
  createYoga,
} from "graphql-yoga";
import { User } from "./modules/user/entities/user.entity";

type GraphQLContext = YogaInitialContext & {
  em: EntityManager<IDatabaseDriver<Connection>>;
};

const users = [
  {
    id: "1",
    login: "Laurin",
  },
  {
    id: "2",
    login: "Saihaj",
  },
  {
    id: "3",
    login: "Dotan",
  },
];

export const schema = makeExecutableSchema({
  typeDefs: /* GraphQL */ `
    type User {
      id: ID!
      login: String!
    }
    type Query {
      hello: String
      user(byId: ID!): User!
    }
  `,
  resolvers: {
    Query: {
      hello: () => "world",
      user: async (_, args, ctx: GraphQLContext) => {
        console.log(ctx.em.findAll(User));
        const user = users.find((user) => user.id === args.byId);
        if (!user) {
          throw createGraphQLError(`User with id '${args.byId}' not found.`, {
            extensions: {
              code: "USER_NOT_FOUND",
              someRandomExtensions: {
                aaaa: 3,
              },
            },
          });
        }

        return user;
      },
    },
  },
});

   const app = express();

export const startServer = async () => {
  const orm = await MikroORM.init();
  const migrator = orm.getMigrator();
  const migrations = await migrator.getPendingMigrations();
  if (migrations && migrations.length > 0) {
    await migrator.up();
  }

  const em = orm.em.fork();

  const yoga = createYoga<{}, GraphQLContext>({
    schema: schema,
    logging: true,
    graphiql: true,
    context: (ctx) => ({ ...ctx, em }),
  });

  // Bind GraphQL Yoga to the graphql endpoint to avoid rendering the playground on any path
  app.use(yoga.graphqlEndpoint, yoga);

  const port = process.env.PORT || 5000;
  return app.listen(port, () => {
    console.log(
      `server started on http://localhost:${port}${yoga.graphqlEndpoint}`
    );
  });
};
