import express from 'express';
import { initORM } from './db.js';
import { initializeYoga } from './lib/graphql/yoga.js';

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
