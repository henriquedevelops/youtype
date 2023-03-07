import { GraphQLContext } from "../../typescriptTypes/user";

const resolvers = {
  // Query:{},
  Mutation: {
    createConversation: async (
      _: any,
      /* Receiving new username from input */
      { participantsIds }: { participantsIds: string[] },

      /* Receving current session data and prisma client from context */
      { currentSession, prisma }: GraphQLContext
    ) => {
      currentSession?.user.id && participantsIds.push(currentSession?.user.id);
      console.log("Salveeeeeeeeeeee!!!!!", participantsIds);
      return { newConversationId: "abcde" };
    },
  },
};

export default resolvers;
