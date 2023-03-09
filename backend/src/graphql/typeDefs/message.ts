import { gql } from "apollo-server-core";

export default gql`
  type Message {
    id: String
    sender: User
    body: String
    createdAt: Date
  }
`;
