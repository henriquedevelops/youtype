import { gql } from "apollo-server-core";

const userTypeDefs = gql`
  type User {
    id: String
    username: String
  }

  type Query {
    searchUsers(username: String): [User]
  }

  type SaveUsernameResponse {
    success: Boolean
    error: String
  }

  type Mutation {
    saveUsernameMutation(inputUsername: String): SaveUsernameResponse
  }
`;

export default userTypeDefs;
