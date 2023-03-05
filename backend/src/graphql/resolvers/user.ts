import { SaveUsernameResponse, GraphQLContext } from "../../util/types";

const userResolvers = {
  Query: {
    searchUsers: () => {},
  },
  Mutation: {
    saveUsernameMutation: async (
      _: any,
      // Receiving new username from input
      { inputUsername }: { inputUsername: string },

      // Receving current session data and prisma client from context
      { currentSession, prisma }: GraphQLContext
    ): Promise<SaveUsernameResponse> => {
      // Checking user logged in

      if (!currentSession?.user) return { error: "Not logged in" };
      try {
        // Checking if username is not already taken by another user
        const alreadyExistingUser = await prisma.user.findUnique({
          where: { username: inputUsername },
        });
        if (alreadyExistingUser) return { error: "Username already taken." };

        // Finally saving new username in database
        await prisma.user.update({
          where: { id: currentSession.user.id },
          data: {
            username: inputUsername,
          },
        });
        return { success: true };
      } catch (error: any) {
        console.log("error on saving username", error);
        return {
          error: error?.message,
        };
      }
    },
  },
};

export default userResolvers;
