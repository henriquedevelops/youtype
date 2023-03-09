import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import express from "express";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import http from "http";
import { makeExecutableSchema } from "@graphql-tools/schema";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import * as dotenv from "dotenv";
import { getSession } from "next-auth/react";
import { GraphQLContext, SubscriptionContext } from "../typescriptTypes/server";
import { PrismaClient } from "@prisma/client";
import { Session } from "../typescriptTypes/server";
import { PubSub } from "graphql-subscriptions";

async function startApolloServer() {
  dotenv.config();
  const app = express();
  const httpServer = http.createServer(app);

  /*  Creating the WebSocket server */
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql/subscriptions",
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const prisma = new PrismaClient();

  const pubsub = new PubSub();

  const serverCleanup = useServer(
    {
      schema,
      context: async (ctx: SubscriptionContext): Promise<GraphQLContext> => {
        if (ctx.connectionParams && ctx.connectionParams.currentSession) {
          const { currentSession } = ctx.connectionParams;

          return { currentSession, prisma, pubsub };
        }

        return { currentSession: null, prisma, pubsub };
      },
    },
    wsServer
  );

  const corsOptions = {
    origin: process.env.CLIENT_ORIGIN,

    /*  Allowing authorization headers */
    credentials: true,
  };

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",

    /*  "context" by default receives the http request as an argument. */
    context: async ({ req, res }): Promise<GraphQLContext> => {
      const currentSession = (await getSession({ req })) as Session;

      /* Apollo will make the object returned from this function available
      in all of the resolver functions */
      return { currentSession, prisma, pubsub };
    },
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  server.applyMiddleware({
    app,
    cors: corsOptions,
  });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 5000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`);
}

startApolloServer().catch((err) => console.log(err));
