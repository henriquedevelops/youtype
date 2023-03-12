import gql from "graphql-tag";

export default gql`
  type Message {
    id: String
    sender: User
    body: String
    createdAt: Date
  }
`;
