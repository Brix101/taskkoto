import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";
import express from "express";
import { YogaInitialContext, createYoga } from "graphql-yoga";
import { buildSchema } from "type-graphql";
import { initORM } from "./db.js";
import { UsersResolver } from "./modules/users/users.resolver.js";

export type GraphQLContext = YogaInitialContext & {
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

const app = express();

export const startServer = async () => {
  const db = await initORM();
  const migrator = db.orm.getMigrator();
  const migrations = await migrator.getPendingMigrations();
  if (migrations && migrations.length > 0) {
    await migrator.up();
  }

  const schema = await buildSchema({
    resolvers: [UsersResolver],
  });

  const yoga = createYoga<{}, GraphQLContext>({
    schema: schema,
    logging: true,
    graphiql: true,
    context: (ctx) => ({ ...ctx, em: db.em }),
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
