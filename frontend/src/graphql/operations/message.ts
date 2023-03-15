import { gql } from "@apollo/client";

export const populatedMessageFields = `
id
sender {
    id
    username
}
body
createdAt
`;

export default {
  Query: {
    getAllMessages: gql`
        query ($selectedConversationId: String){
            getAllMessages(selectedConversationId: $selectedConversationId) {
                ${populatedMessageFields}
            }
        }
        `,
  },

  Mutation: {
    createMessage: gql`
      mutation (
        $selectedConversationId: String!
        $senderId: String!
        $messageBody: String!
      ) {
        createMessage(
          selectedConversationId: $selectedConversationId
          senderId: $senderId
          messageBody: $messageBody
        )
      }
    `,
  },

  Subscriptions: {
    messageCreation: gql`
      subscription ($selectedConversationId: String!) {
        messageCreation(selectedConversationId: $selectedConversationId){
            ${populatedMessageFields}
        }
      }
    `,
  },
};
