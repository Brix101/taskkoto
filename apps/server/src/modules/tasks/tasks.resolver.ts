import { GraphQLContext } from '@/lib/graphql/yoga.js';
import { log } from '@/lib/logger.js';
import { Resolvers, TaskStatus } from '@/types/resolvers.generated.js';
import { NotFoundError, QueryOrder, UniqueConstraintViolationException } from '@mikro-orm/core';
import { GraphQLError } from 'graphql';
import { UserEntity } from '../users/entities/user.entity.js';
import { TaskEntity } from './entities/task.entity.js';

const taskResolvers: Resolvers<GraphQLContext> = {
  Query: {
    task: async (_parent, args, ctx) => {
      const id = args.id;
      try {
        return await ctx.taskDataloader.load(Number(id));
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
    tasks: async (_parent, { first, after }, ctx) => {
      try {
        const cursor = await ctx.em.findByCursor(TaskEntity, {}, { orderBy: { title: QueryOrder.ASC }, first: first ?? 10, after });

        return {
          pageInfo: {
            hasNextPage: cursor.hasNextPage,
            hasPrevPage: cursor.hasPrevPage,
            startCursor: cursor.startCursor,
            endCursor: cursor.endCursor,
            totalCount: cursor.totalCount,
            length: cursor.length,
          },
          edges: cursor.items.map((item: TaskEntity) => ({
            cursor: item.id,
            node: item,
          })),
        };
      } catch (error) {
        log.error(error.message);
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
  TaskEdge: {
    cursor: async ({ node }, _args, _ctx): Promise<string> => {
      return node.id.toString();
    },
    node: async ({ cursor }, _args, ctx): Promise<TaskEntity> => {
      return ctx.taskDataloader.load(cursor);
    },
  },
  Task: {
    id: async ({ id }, _args, ctx): Promise<string> => {
      const task = await ctx.taskDataloader.load(id);
      return task.id.toString();
    },
    title: async ({ id }, _args, ctx): Promise<string> => {
      const { title } = await ctx.taskDataloader.load(id);
      return title;
    },
    description: async ({ id }, _args, ctx): Promise<string> => {
      const { description } = await ctx.taskDataloader.load(id);
      return description ?? '';
    },
    status: async ({ id }, _args, ctx): Promise<TaskStatus> => {
      const { status } = await ctx.taskDataloader.load(id);
      return status;
    },
    createdAt: async ({ id }, _args, ctx): Promise<string> => {
      const { createdAt } = await ctx.taskDataloader.load(id);
      return createdAt.toISOString();
    },
    updatedAt: async ({ id }, _args, ctx): Promise<string> => {
      const { updatedAt } = await ctx.taskDataloader.load(id);
      return updatedAt.toISOString();
    },
    createdBy: async ({ id }, _args, ctx): Promise<UserEntity> => {
      const { createdBy } = await ctx.taskDataloader.load(id);
      return createdBy;
    },
    assignee: async ({ id }, _args, ctx): Promise<UserEntity> => {
      const { assignee } = await ctx.taskDataloader.load(id);
      return assignee;
    },
  },
};

export default taskResolvers;
