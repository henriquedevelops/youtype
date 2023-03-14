import { Prisma } from "@prisma/client";
import { populatedMessage } from "../graphql/resolvers/message";

export interface ArgumentsCreateMessage {
  selectedConversationId: string;
  senderId: string;
  messageBody: string;
}

export type PopulatedMessage = Prisma.MessageGetPayload<{
  include: typeof populatedMessage;
}>;

export interface MessageCreationSubscriptionPayload {
  newMessage: PopulatedMessage;
}
