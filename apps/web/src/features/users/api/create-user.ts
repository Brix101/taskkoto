import { graphql } from "gql.tada";

const query = graphql(`
  mutation createUser($input: CreateUserInput) {
    createUser(input: $input) {
      id
      createdAt
      updatedAt
      fullName
      email
      bio
    }
  }
`);
