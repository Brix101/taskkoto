import { GraphQLContext } from '@/lib/graphql/yoga.js';
import { log } from '@/lib/logger.js';
import { Resolvers } from '@/types/resolvers.generated.js';
import { NotFoundError, UniqueConstraintViolationException } from '@mikro-orm/core';
import { GraphQLError } from 'graphql';
import { TaskEntity } from './entities/task.entity.js';

const taskResolvers: Resolvers<GraphQLContext> = {
  Query: {
    task: async (_parent, args, ctx) => {
      const id = args.id;
      try {
        const taskRepo = ctx.em.getRepository(TaskEntity);
        const task = await taskRepo.findOneOrFail(
          {
            id: Number(id),
          },
          {
            populate: ['*'],
          },
        );

        return task;
      } catch (error) {
        if (error instanceof NotFoundError) {
          throw new GraphQLError(`Task not found with id '${id}'.`, {
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
    tasks: async (_parent, _args, ctx, info) => {
      try {
        return await ctx.em.getRepository(TaskEntity).findAll();
      } catch (error) {
        log.error(error);
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    createTask: async (_parent, { input }, ctx) => {
      try {
        if (!input) {
          throw new GraphQLError('Add input', {});
        }

        const taskInput = new TaskEntity(input);
        const task = ctx.em.create(TaskEntity, { ...taskInput, createdBy: 1 });
        await ctx.em.persistAndFlush(task);

        return task;
      } catch (error) {
        if (error instanceof UniqueConstraintViolationException) {
          throw new GraphQLError('A task with this email already exists.', {
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

export default taskResolvers;
