import { ApolloError } from "apollo-server-core";
import { GraphQLContext } from "../../typescriptTypes/user";

const resolvers = {
  // Query:{},
  Mutation: {
    createConversation: async (
      _: any,
      /* Extracting new username from input */
      { participantsIds }: { participantsIds: string[] },

      /* Extracting current session data and prisma client from context */
      { currentSession, prisma }: GraphQLContext
    ): Promise<{ newConversationId: string }> => {
      if (!currentSession?.user.id) throw new ApolloError("Not logged in");
      /* Insert currently authenticated user into the conversation he is creating */
      participantsIds.push(currentSession?.user.id);

      try {
        /* Creating new document on the database */
        const newConversation = await prisma.conversation.create({
          data: {
            /* Populating the participant field with the value received from
               the "participantIds" array */
            participants: {
              createMany: {
                data: participantsIds.map((id) => ({
                  userId: id,
                  hasSeenLatestMessage: id === currentSession.user.id,
                })),
              },
            },
          },

          /* Specifying fields that should be present on the returned value */
          include: {
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
          },
        });

        return { newConversationId: newConversation.id };
      } catch (error) {
        console.log(error);
        throw new ApolloError("Error creating conversation");
      }
    },
  },
};

export default resolvers;
