import { Prisma } from "@prisma/client";
import { GraphQLError } from "graphql";
import { ArgumentsCreateMessage } from "../../typescriptTypes/message";
import { GraphQLContext } from "../../typescriptTypes/server";

export default {
  Query: {},
  Mutation: {
    createMessage: async (
      _: any,

      /* Extracting new message data from input */
      {
        messageId,
        selectedConversationId,
        senderId,
        messageBody,
      }: ArgumentsCreateMessage,

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
            id: messageId,
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

            /* Update sender "hasSeenLatestMessage" to true */
            participants: {
              update: {
                where: {
                  id: senderId,
                },
                data: {
                  hasSeenLatestMessage: true,
                },
              },

              /* Update receivers "hasSeenLatestMessage" to false */
              updateMany: {
                where: {
                  NOT: {
                    userId: senderId,
                  },
                },
                data: {
                  hasSeenLatestMessage: false,
                },
              },
            },
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
  Subscription: {},
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
