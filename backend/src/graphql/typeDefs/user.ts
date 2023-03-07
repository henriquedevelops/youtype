import { gql } from "apollo-server-core";

const userTypeDefs = gql`
  type UserSearchResult {
    id: String
    username: String
  }

  type Query {
    searchUsers(targetUsername: String): [UserSearchResult]
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
