import { createSchema } from "graphql-yoga";
import resolvers from "./resolvers";
import typeDefs from "./type-defs";
import { GraphQLContext } from "./yoga";

const schema = createSchema<GraphQLContext>({
  typeDefs,
  resolvers,
});

export default schema;
