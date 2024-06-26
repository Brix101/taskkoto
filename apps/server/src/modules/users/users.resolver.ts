import { GraphQLContext } from '@/lib/graphql/yoga.js';
import { log } from '@/lib/logger.js';
import { Resolvers } from '@/types/resolvers.generated.js';
import { NotFoundError, UniqueConstraintViolationException } from '@mikro-orm/core';
import { GraphQLError } from 'graphql';
import { UserEntity } from './entities/user.entity.js';

const userResolvers: Resolvers<GraphQLContext> = {
  Query: {
    user: async (_parent, { id }, ctx) => {
      try {
        const user = await ctx.userDataloader.load(Number(id));
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
    users: async (_parent, _args, ctx) => {
      try {
        return await ctx.em.getRepository(UserEntity).findAll();
      } catch (error) {
        log.error(error);
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    createUser: async (_parent, { input }, ctx) => {
      try {
        if (!input) {
          throw new GraphQLError('Add input', {});
        }

        const userInput = new UserEntity(input);
        const user = ctx.em.create(UserEntity, userInput);
        await ctx.em.persistAndFlush(user);

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
  User: {
    id: async ({ id }, _args, ctx): Promise<string> => {
      const user = await ctx.userDataloader.load(id);
      return user.id.toString();
    },
    email: async ({ id }, _args, ctx): Promise<string> => {
      const { email } = await ctx.userDataloader.load(id);
      return email;
    },
    name: async ({ id }, _args, ctx): Promise<string> => {
      const { name } = await ctx.userDataloader.load(id);
      return name;
    },
    bio: async ({ id }, _args, ctx): Promise<string> => {
      const { bio } = await ctx.userDataloader.load(id);
      return bio ?? '';
    },
    createdAt: async ({ id }, _args, ctx): Promise<string> => {
      const { createdAt } = await ctx.userDataloader.load(id);
      return createdAt.toISOString();
    },
    updatedAt: async ({ id }, _args, ctx): Promise<string> => {
      const { updatedAt } = await ctx.userDataloader.load(id);
      return updatedAt.toISOString();
    },
  },
};

export default userResolvers;
