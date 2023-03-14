import gql from "graphql-tag";

export default gql`
  type Message {
    id: String
    sender: User
    body: String
    createdAt: Date
  }

  type Query {
    getAllMessages(selectedConversationId: String): [Message]
  }

  type Mutation {
    createMessage(
      selectedConversationId: String
      senderId: String
      messageBody: String
    ): Boolean
  }

  type Subscription {
    messageCreation(selectedConversationId: String): Message
  }
`;
