import { makeExecutableSchema } from "@graphql-tools/schema";
import express from "express";
import { createGraphQLError, createYoga } from "graphql-yoga";

const users = [
  {
    id: "1",
    login: "Laurin",
  },
  {
    id: "2",
    login: "Saihaj",
  },
  {
    id: "3",
    login: "Dotan",
  },
];

export const schema = makeExecutableSchema({
  typeDefs: /* GraphQL */ `
    type User {
      id: ID!
      login: String!
    }
    type Query {
      hello: String
      user(byId: ID!): User!
    }
  `,
  resolvers: {
    Query: {
      hello: () => "world",
      user: async (_, args) => {
        const user = users.find((user) => user.id === args.byId);
        if (!user) {
          throw createGraphQLError(`User with id '${args.byId}' not found.`, {
            extensions: {
              code: "USER_NOT_FOUND",
              someRandomExtensions: {
                aaaa: 3,
              },
            },
          });
        }

        return user;
      },
    },
  },
});

const app = express();
const yoga = createYoga({
  schema: schema,
  logging: true,
});

// Bind GraphQL Yoga to the graphql endpoint to avoid rendering the playground on any path
app.use(yoga.graphqlEndpoint, yoga);

export const startServer = async () => {
  const port = process.env.PORT || 5000;
  return app.listen(port, () => {
    console.log(
      `server started on http://localhost:${port}${yoga.graphqlEndpoint}`
    );
  });
};
