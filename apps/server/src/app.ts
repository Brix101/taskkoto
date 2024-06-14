import {
  Connection,
  EntityManager,
  IDatabaseDriver,
  NotFoundError,
  UniqueConstraintViolationException,
} from "@mikro-orm/core";
import express from "express";
import { GraphQLError } from "graphql";
import { YogaInitialContext, createSchema, createYoga } from "graphql-yoga";
import { initORM } from "./db.js";
import typeDefs from "./lib/graphql/type-defs.js";
import { log } from "./lib/logger.js";
import { Users } from "./modules/users/entities/user.entity.js";

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

  const schema = createSchema<GraphQLContext>({
    typeDefs,
    resolvers: {
      Query: {
        user: async (_parent, args, ctx) => {
          const id = args.id;
          try {
            const userRepo = ctx.em.fork().getRepository(Users);
            const user = await userRepo.findOneOrFail({
              id,
            });

            return user;
          } catch (error: any) {
            if (error instanceof NotFoundError) {
              throw new GraphQLError(`User not found with id '${id}'.`, {
                originalError: error,
                extensions: {
                  code: "NOT_FOUND_ERROR",
                },
              });
            } else {
              log.error(error);
              throw new GraphQLError(error.message);
            }
          }
        },
        users: async (_parent, _args, ctx) => {
          const userRepo = ctx.em.fork().getRepository(Users);

          return userRepo.findAll();
        },
      },
      Mutation: {
        createUser: async (_parent, args, ctx) => {
          try {
            const em = ctx.em.fork();
            const userRepo = em.getRepository(Users);
            const user = userRepo.create(args);
            // Persist the user to the database
            await em.flush();

            return user;
          } catch (error: any) {
            if (error instanceof UniqueConstraintViolationException) {
              throw new GraphQLError("A user with this email already exists.", {
                originalError: error,
              });
            } else {
              log.error(error);
              throw new GraphQLError(error.message);
            }
          }
        },
      },
    },
  });

  const yoga = createYoga<ServerContext, GraphQLContext>({
    schema,
    graphiql: true,
    context: (ctx) => ({ ...ctx, em: db.em }),
  });

  app.use(yoga.graphqlEndpoint, yoga);

  return yoga.graphqlEndpoint;
};
