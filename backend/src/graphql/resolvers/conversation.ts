import { Prisma } from "@prisma/client";
import { ApolloError } from "apollo-server-core";
import { GraphQLError } from "graphql";
import { withFilter } from "graphql-subscriptions";
import {
  ConversationCreationSubscriptionPayload,
  PopulatedConversation,
} from "../../typescriptTypes/conversation";
import { GraphQLContext } from "../../typescriptTypes/server";

const resolvers = {
  Query: {
    getAllConversations: async (
      _: any,
      __: any,

      /* Extracting current session data and prisma client from
      Apollo Server context */
      { currentSession, prisma }: GraphQLContext
    ): Promise<Array<PopulatedConversation>> => {
      if (!currentSession?.user.id) throw new ApolloError("Not logged in");

      try {
        /* Fetch all conversations from currently authenticated user */
        const allConversations = await prisma.conversation.findMany({
          where: {
            participants: {
              some: {
                userId: {
                  equals: currentSession.user.id,
                },
              },
            },
          },

          /* Populating the fields "participants" and "latestMessage" */
          include: participantsAndLatestMessage,
        });

        /* Send array of populated conversations to the client */
        return allConversations;
      } catch (error) {
        console.log(error);
        throw new ApolloError("Error fetching conversations");
      }
    },
    getConversationById: async (
      _: any,
      { selectedConversationId }: { selectedConversationId: string },
      { currentSession, prisma }: GraphQLContext
    ): Promise<PopulatedConversation> => {
      if (!currentSession?.user.id) throw new ApolloError("Not logged in");

      try {
        /* Fetch conversation by ID and populate the fields "participants" and "latestMessage" */
        const conversationFound = await prisma.conversation.findUnique({
          where: {
            id: selectedConversationId,
          },
          include: participantsAndLatestMessage,
        });

        if (!conversationFound) throw new ApolloError("Conversation not found");

        /* Making sure the current user is a participant of the conversation */
        const isParticipant = conversationFound.participants.some(
          (p) => p.userId === currentSession.user.id
        );
        if (!isParticipant) throw new ApolloError("Access denied");

        /* Send populated conversation to the client */
        return conversationFound;
      } catch (error) {
        console.log(error);
        throw new ApolloError("Error fetching conversation");
      }
    },
  },

  Mutation: {
    createConversation: async (
      _: any,

      /* Extracting new username from input */
      { participantsIds }: { participantsIds: string[] },

      /* Extracting current session data and prisma client from context */
      { currentSession, prisma, pubsub }: GraphQLContext
    ): Promise<{ newConversationId: string }> => {
      if (!currentSession?.user.id) throw new ApolloError("Not logged in");
      /* Insert currently authenticated user into the conversation he is creating */
      participantsIds.push(currentSession?.user.id);

      try {
        /* Creating one "Conversation" document for this new conversation */
        const newConversation = await prisma.conversation.create({
          data: {
            /* Creating one "ConversationParticipant" document for each one
             of the participants in this new conversation */
            participants: {
              createMany: {
                /* Converting the array of id strings into an array of objects */
                data: participantsIds.map((id) => ({
                  userId: id,
                  hasSeenLatestMessage: id === currentSession.user.id,
                })),
              },
            },
          },

          /* This "include" specifies the fields that shall be present on this 
          "newConversation" object that is returned from the 
          prisma.conversation.create() */
          include: participantsAndLatestMessage,
        });

        /* Emit the conversation creation event with the new conversation
         as the payload (triggering the subscription "conversationCreation") */
        pubsub.publish("CONVERSATION_CREATION", {
          conversationCreation: newConversation,
        });

        /* Send new conversation id to the client */
        return { newConversationId: newConversation.id };
      } catch (error) {
        console.log(error);
        throw new ApolloError("Error creating conversation");
      }
    },
  },

  Subscription: {
    /* This subscription listens to the conversation creation event 
      at the createConversation resolver */
    conversationCreation: {
      subscribe: withFilter(
        (_: any, __: any, { pubsub }: GraphQLContext) => {
          return pubsub.asyncIterator(["CONVERSATION_CREATION"]);
        },

        /* Filtering non participants */
        (
          {
            conversationCreation: { participants },
          }: ConversationCreationSubscriptionPayload,
          _,
          { currentSession }: GraphQLContext
        ) => {
          if (!currentSession?.user) {
            throw new GraphQLError("Not authorized");
          }

          const currentUserIsParticipant = !!participants.find(
            (participant) => participant.userId === currentSession.user.id
          );
          return currentUserIsParticipant;
        }
      ),
    },
  },
};

/* Reusable piece of query that populates the fields "participants"
 and "latestMessage" in the queried conversation */
export const participantsAndLatestMessage =
  /* Typescript types "ConversationInclude" is automatically 
generated by Prisma when running the "generate" command  */
  Prisma.validator<Prisma.ConversationInclude>()({
    participants: {
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    },
    latestMessage: {
      include: {
        sender: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    },
  });

export default resolvers;
