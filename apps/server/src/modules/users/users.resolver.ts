import {
  NotFoundError,
  UniqueConstraintViolationException,
} from "@mikro-orm/core";
import { GraphQLError } from "graphql";
import { GraphQLContext } from "../../lib/graphql/yoga";
import { log } from "../../lib/logger";
import { UserEntity } from "../../modules/users/entities/user.entity";
import { Resolvers } from "../../types/resolvers.generated";

const userResolvers: Resolvers<GraphQLContext> = {
  Query: {
    user: async (_root, args, ctx) => {
      const id = args.id;
      try {
        const userRepo = ctx.em.fork().getRepository(UserEntity);
        const user = await userRepo.findOneOrFail({
          id: Number(id),
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
    users: async (_root, _args, ctx) => {
      const userRepo = ctx.em.fork().getRepository(UserEntity);

      return userRepo.findAll();
    },
  },
  Mutation: {
    createUser: async (_root, args, ctx) => {
      try {
        const em = ctx.em.fork();
        const userRepo = em.getRepository(UserEntity);
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
};

export default userResolvers;
