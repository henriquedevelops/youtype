import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
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
import cors from "cors";
import { json } from "body-parser";

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

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    // cache: "bounded",

    // /*  "context" by default receives the http request as an argument. */
    // context: async ({ req, res }): Promise<GraphQLContext> => {
    //   const currentSession = (await getSession({ req })) as Session;

    //   /* Apollo will make the object returned from this function available
    //   in all of the resolver functions */
    //   return { currentSession, prisma, pubsub };
    // },
    plugins: [
      /* Proper shutdown for the HTTP server. */
      ApolloServerPluginDrainHttpServer({ httpServer }),

      /* Proper shutdown for the WebSocket server. */
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

  const corsOptions = {
    origin: process.env.BASE_URL,
    credentials: true,
  };

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(corsOptions),
    json(),
    expressMiddleware(server, {
      context: async ({ req }): Promise<GraphQLContext> => {
        const currentSession = (await getSession({ req })) as Session;

        return { currentSession, prisma, pubsub };
      },
    })
  );

  const PORT = 5000;

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );
  console.log(`Server is now running on http://localhost:${PORT}/graphql`);
}

startApolloServer().catch((err) => console.log(err));
