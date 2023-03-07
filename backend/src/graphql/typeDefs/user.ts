import { gql } from "apollo-server-core";

const userTypeDefs = gql`
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

export default userTypeDefs;
