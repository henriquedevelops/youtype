import gql from "graphql-tag";

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

  type Query {
    searchUsers(targetUsername: String): [UserFound]
  }

  type Mutation {
    saveUsernameMutation(inputUsername: String): Boolean
  }
`;
