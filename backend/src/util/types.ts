import type { PrismaClient } from "@prisma/client";
import { ISODateString } from "next-auth";

export interface Session {
  user: User;
  expires: ISODateString;
}

interface User {
  id: string;
  username: string;
  image: string;
  email: string;
  name: string;
}

export interface GraphQLContext {
  currentSession: Session | null;
  prisma: PrismaClient;
  // pubsub
}

export interface SaveUsernameResponse {
  success?: boolean;
  error?: string;
}
