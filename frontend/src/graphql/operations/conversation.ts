import { gql } from "@apollo/client";

/* The gql function is used to parse the GraphQL code into
a synthax that can be used by the Apollo client to send the
mutation to the GraphQL server. */

export default {
  Queries: {},
  Mutations: {
    /* This operation triggers the mutation called 
    (createConversation). It takes an array of participant ids
    as arguments and returns the Id of the newly created
    conversation */
    createConversation: gql`
      mutation ($participantsIds: [String]!) {
        createConversation(participantsIds: $participantsIds) {
          newConversationId
        }
      }
    `,
  },
  Subscriptions: {},
};
