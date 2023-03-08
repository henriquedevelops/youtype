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
    ) => {
      currentSession?.user.id && participantsIds.push(currentSession?.user.id);
      return { newConversationId: "abcde" };
    },
  },
};

export default resolvers;
