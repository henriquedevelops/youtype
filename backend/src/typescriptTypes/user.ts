import { Prisma } from "@prisma/client";
import { populateParticipants } from "../graphql/resolvers/conversation";

export interface User {
  id: string;
  username: string;
  image: string;
  email: string;
  name: string;
}

export interface SaveUsernameResponse {
  success?: boolean;
  error?: string;
}

/* Creating a typescript type for the specific result from the prisma query
  (with populated fields) */
export type PopulatedParticipant = Prisma.ConversationParticipantGetPayload<{
  include: typeof populateParticipants;
}>;
