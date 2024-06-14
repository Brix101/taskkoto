import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/generated/schema.graphql",
  generates: {
    "src/generated/resolvers-types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        mappers: {
          User: "./../modules/users/entities/user.entity#UserEntity",
        },
      },
    },
  },
};
export default config;
