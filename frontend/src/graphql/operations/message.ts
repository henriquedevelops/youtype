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
        $messageId: String!
        $selectedConversationId: String!
        $senderId: String!
        $messageBody: String!
      ) {
        createMessage(
          messageId: $messageId
          selectedConversationId: $selectedConversationId
          senderId: $senderId
          messageBody: $messageBody
        )
      }
    `,
  },
  Subscription: {
    messageCreation: gql`
      subscription ($selectedConversationId: String!) {
        messageCreation(selectedConversationId: $selectedConversationId){
            ${populatedMessageFields}
        }
      }
    `,
  },
};
