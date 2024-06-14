import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/generated/schema.graphql",
  generates: {
    "./src/generated/resolvers-types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
};
export default config;
