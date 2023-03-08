import { ApolloError } from "apollo-server-core";
import { User } from "@prisma/client";
import {
  GraphQLContext,
  SaveUsernameResponse,
} from "../../typescriptTypes/user";
const userResolvers = {
  Query: {
    searchUsers: async (
      _: any,
      /* Extracting new username from input */
      { targetUsername }: { targetUsername: string },

      /* Extracting current session data and prisma client from context */
      { currentSession, prisma }: GraphQLContext
    ): Promise<Array<User>> => {
      /* Authentication */
      if (!currentSession?.user) throw new ApolloError("Not logged in");
      try {
        const searchResult = await prisma.user.findMany({
          where: {
            username: {
              contains: targetUsername,

              /* Excluding currently authenticated user from the search */
              not: currentSession.user.username,

              /* Disabling case senstitive option */
              mode: "insensitive",
            },
          },
        });

        return searchResult;
      } catch (error: any) {
        throw new ApolloError(error?.message);
      }
    },
  },
  Mutation: {
    saveUsernameMutation: async (
      _: any,
      /* Receiving new username from input */
      { inputUsername }: { inputUsername: string },

      /* Receving current session data and prisma client from context */
      { currentSession, prisma }: GraphQLContext
    ): Promise<SaveUsernameResponse> => {
      /* Authentication */
      if (!currentSession?.user) throw new ApolloError("Not logged in.");
      try {
        /* Checking if username is not already taken by another user */
        const alreadyExistingUser = await prisma.user.findUnique({
          where: { username: inputUsername },
        });
        if (alreadyExistingUser)
          throw new ApolloError("Username not available.");

        /* Finally saving new username in database */
        await prisma.user.update({
          where: { id: currentSession.user.id },
          data: {
            username: inputUsername,
          },
        });
        return { success: true };
      } catch (error: any) {
        return {
          error: error?.message,
        };
      }
    },
  },
};

export default userResolvers;
