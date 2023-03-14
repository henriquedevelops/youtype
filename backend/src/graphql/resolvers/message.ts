import { Prisma } from "@prisma/client";
import { GraphQLError } from "graphql";
import { withFilter } from "graphql-subscriptions";
import {
  ArgumentsCreateMessage,
  MessageCreationSubscriptionPayload,
  PopulatedMessage,
} from "../../typescriptTypes/message";
import { GraphQLContext } from "../../typescriptTypes/server";
import { verifyConversationParticipant } from "../../util/util";
import { populatedConversation } from "./conversation";

export default {
  Query: {
    getAllMessages: async (
      _: any,

      /* Extracting from input */
      {
        selectedConversationId,
      }: { selectedConversationId: string | undefined },

      /* Extracting from Apollo context */
      { currentSession, prisma, pubsub }: GraphQLContext
    ): Promise<Array<PopulatedMessage> | null> => {
      /* Requering login */
      if (!currentSession?.user.id) throw new GraphQLError("Not logged in");
      if (!selectedConversationId) return null;
      /* Validating conversation id */
      const existingConversation = await prisma.conversation.findUnique({
        where: {
          id: selectedConversationId,
        },
        include: populatedConversation,
      });
      if (!existingConversation)
        throw new GraphQLError("Conversation not found");

      /* Authorizing user */
      const userIsAuthorized = verifyConversationParticipant(
        existingConversation.participants,
        currentSession.user.id
      );

      if (!userIsAuthorized) throw new GraphQLError("Not authorized!!!");

      try {
        /* Retrieve messages from conversation and order by time of creation */
        const allMessagesOnThisConversation = await prisma.message.findMany({
          where: {
            conversationId: selectedConversationId,
          },
          include: populatedMessage,
          orderBy: {
            createdAt: "desc",
          },
        });

        /* Update the message feed of the participants */
        return allMessagesOnThisConversation;
      } catch (error) {
        throw new GraphQLError("Something went wrong");
      }
    },
  },
  Mutation: {
    createMessage: async (
      _: any,

      /* Extracting new message data from input */
      { selectedConversationId, senderId, messageBody }: ArgumentsCreateMessage,

      /* Extracting prisma and session from Apollo context */
      { currentSession, prisma, pubsub }: GraphQLContext
    ): Promise<boolean> => {
      if (!currentSession?.user.id) throw new GraphQLError("Not logged in");

      /* Checking if senderId matches currently authenticated
      user id. (security step) */
      if (currentSession.user.id !== senderId)
        throw new GraphQLError("Not authorized");

      try {
        /* Create new message document on the database */
        const newMessage = await prisma.message.create({
          data: {
            senderId,
            conversationId: selectedConversationId,
            body: messageBody,
          },
          include: populatedMessage,
        });

        /* Update selected conversation latest message id */
        const updatedConversation = await prisma.conversation.update({
          where: {
            id: selectedConversationId,
          },
          data: {
            latestMessageId: newMessage.id,
          },
          include: populatedConversation,
        });

        /* Update sender "hasSeenLatestMessage" to true */
        await prisma.conversationParticipant.updateMany({
          where: {
            userId: senderId,
            conversationId: selectedConversationId,
          },
          data: {
            hasSeenLatestMessage: true,
          },
        });

        /* Update receivers "hasSeenLatestMessage" to false */
        await prisma.conversationParticipant.updateMany({
          where: {
            userId: {
              not: senderId,
            },
            conversationId: selectedConversationId,
          },
          data: {
            hasSeenLatestMessage: false,
          },
        });

        /* Update message feeds of the participants in
         real-time */
        pubsub.publish("MESSAGE_CREATED", newMessage);
        pubsub.publish("CONVERSATION_UPDATED", updatedConversation);
      } catch (error) {
        throw new GraphQLError("Error creating message");
      }

      return true;
    },
  },
  Subscription: {
    messageCreation: {
      /* This subscription is triggered every time there is an
      event on the "MESSAGE_CREATION" channel */
      subscribe: withFilter(
        (_: any, __: any, { pubsub }: GraphQLContext) => {
          return pubsub.asyncIterator(["MESSAGE_CREATION"]);
        },

        (
          { newMessage }: MessageCreationSubscriptionPayload,
          { selectedConversationId }: { selectedConversationId: string },
          { currentSession }: GraphQLContext
        ) => {
          /* Authorization */
          if (!currentSession?.user) throw new GraphQLError("Not authorized");

          return newMessage.conversationId === selectedConversationId;
        }
      ),
    },
  },
};

/* Reusable piece of query that populates the field sender */
export const populatedMessage = Prisma.validator<Prisma.MessageInclude>()({
  sender: {
    select: {
      id: true,
      username: true,
    },
  },
});
