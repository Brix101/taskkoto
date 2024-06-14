import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";
import express from "express";
import { YogaInitialContext, createYoga } from "graphql-yoga";
import { buildSchema } from "type-graphql";
import { initORM } from "./db.js";
import { UsersResolver } from "./modules/users/users.resolver.js";

export type GraphQLContext = YogaInitialContext & {
  em: EntityManager<IDatabaseDriver<Connection>>;
};

export const buildApp = async (app: ReturnType<typeof express>) => {
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

  app.use(yoga.graphqlEndpoint, yoga);

  return yoga.graphqlEndpoint;
};
