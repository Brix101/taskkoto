import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'src/modules/**/*.graphql',
  generates: {
    'src/types/resolvers.generated.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        mappers: {
          User: '../modules/users/entities/user.entity.js#UserEntity',
          Task: '../modules/tasks/entities/task.entity.js#TaskEntity',
        },
        enumValues: {
          TaskStatus: '../modules/tasks/entities/task.entity.js#TaskStatus',
        },
      },
    },
  },
  // watch: true,
};
export default config;
