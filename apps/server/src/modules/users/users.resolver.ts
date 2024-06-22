import { GraphQLContext } from '@/lib/graphql/yoga.js';
import { log } from '@/lib/logger.js';
import { Resolvers } from '@/types/resolvers.generated.js';
import { NotFoundError, UniqueConstraintViolationException } from '@mikro-orm/core';
import { GraphQLError } from 'graphql';
import { UserEntity } from './entities/user.entity.js';

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
      } catch (error) {
        if (error instanceof NotFoundError) {
          throw new GraphQLError(`User not found with id '${id}'.`, {
            originalError: error,
            extensions: {
              code: 'NOT_FOUND_ERROR',
            },
          });
        } else {
          log.error(error);
          throw new GraphQLError(error.message);
        }
      }
    },
    users: async (_root, _args, ctx) => {
      try {
        return await ctx.em.getRepository(UserEntity).findAll();
      } catch (error) {
        log.error(error);
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    createUser: async (_root, { input }, ctx) => {
      try {
        if (!input) {
          throw new GraphQLError('Add input', {});
        }
        const em = ctx.em.fork();

        const userInput = new UserEntity(input);
        const user = em.create(UserEntity, userInput);
        await em.persistAndFlush(user);

        return user;
      } catch (error) {
        if (error instanceof UniqueConstraintViolationException) {
          throw new GraphQLError('A user with this email already exists.', {
            originalError: error,
          });
        } else {
          log.error(error.message);
          throw new GraphQLError(error.message);
        }
      }
    },
  },
};

export default userResolvers;
