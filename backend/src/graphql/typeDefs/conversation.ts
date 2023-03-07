import { gql } from "apollo-server-core";

const typeDefs = gql`
  type CreateConversationResponse {
    newConversationId: String
  }

  type Mutation {
    createConversation(participantsIds: [String]): CreateConversationResponse
  }
`;

export default typeDefs;
