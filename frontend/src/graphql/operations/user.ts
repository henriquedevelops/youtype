import { gql } from "@apollo/client";

/* The gql function is used to parse the GraphQL code into
a synthax that can be used by the Apollo client to send the
mutation to the GraphQL server. */

export default {
  Queries: {
    searchUsers: gql`
      query ($targetUsername: String!) {
        searchUsers(targetUsername: $targetUsername) {
          id
          username
        }
      }
    `,
  },

  Mutations: {
    /* saveUsername mutation takes a single argument, 
    "inputUsername", which is of type "String!". The mutation 
    returns an object with two fields: "success" and "error". */
    saveUsernameGQL: gql`
      mutation SaveUsernameMutation($inputUsername: String!) {
        saveUsernameMutation(inputUsername: $inputUsername) {
          success
          error
        }
      }
    `,
  },
  Subscriptions: {},
};
