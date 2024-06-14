import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";
import express from "express";
import { YogaInitialContext } from "graphql-yoga";
import { initORM } from "./db.js";
import { initializeYoga } from "./lib/graphql/yoga.js";

export type GraphQLContext = YogaInitialContext & {
  em: EntityManager<IDatabaseDriver<Connection>>;
};

export type ServerContext = {};

export const buildApp = async (app: ReturnType<typeof express>) => {
  const db = await initORM();
  const migrator = db.orm.getMigrator();
  const migrations = await migrator.getPendingMigrations();
  if (migrations && migrations.length > 0) {
    await migrator.up();
  }

  const yoga = initializeYoga(db);

  app.use(yoga.graphqlEndpoint, yoga);

  return yoga.graphqlEndpoint;
};
