import {
  NotFoundError,
  UniqueConstraintViolationException,
} from "@mikro-orm/core";
import { GraphQLError } from "graphql";
import { createSchema } from "graphql-yoga";
import { Users } from "../../modules/users/entities/user.entity";
import { log } from "../logger";
import typeDefs from "./type-defs";
import { GraphQLContext } from "./yoga";

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

export default schema;
