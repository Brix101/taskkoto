import { createSchema } from "graphql-yoga";
import typeDefs from "./type-defs";

export default createSchema({
  typeDefs,
  resolvers: {},
});
