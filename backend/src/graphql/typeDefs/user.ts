import { gql } from "apollo-server-core";

export default gql`
  type User {
    id: String
    name: String
    username: String
    email: String
    emailVerified: Boolean
    image: String
  }

  type UserFound {
    id: String
    username: String
  }

  type SaveUsernameResponse {
    success: Boolean
    error: String
  }

  type Query {
    searchUsers(targetUsername: String): [UserFound]
  }

  type Mutation {
    saveUsernameMutation(inputUsername: String): SaveUsernameResponse
  }
`;
