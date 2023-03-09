import type { PrismaClient } from "@prisma/client";
import { PubSub } from "graphql-subscriptions";
import { Context } from "graphql-ws/lib/server";
import { ISODateString } from "next-auth";
import { User } from "./user";

export interface Session {
  user: User;
  expires: ISODateString;
}

/* Data that is passed through Apollo context into the 
resolver functions */
export interface GraphQLContext {
  currentSession: Session | null;
  prisma: PrismaClient;
  pubsub: PubSub;
}

export interface SubscriptionContext extends Context {
  connectionParams: {
    currentSession?: Session;
  };
}
