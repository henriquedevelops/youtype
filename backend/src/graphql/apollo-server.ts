import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import express from "express";
import http from "http";
import { makeExecutableSchema } from "@graphql-tools/schema";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import * as dotenv from "dotenv";
import { getSession } from "next-auth/react";
import { GraphQLContext } from "../util/types";
import { PrismaClient } from "@prisma/client";
import { Session } from "../util/types";

async function startApolloServer() {
  dotenv.config();
  const app = express();
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const corsOptions = {
    origin: process.env.CLIENT_ORIGIN,

    // Allowing authorization headers
    credentials: true,
  };

  const prisma = new PrismaClient();

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",

    /*  "context" by default receives the http request as an argument.
    Apollo will make the object returned from this function available
    in all of the resolver functions */
    context: async ({ req, res }): Promise<GraphQLContext> => {
      const currentSession = (await getSession({ req })) as Session;

      return { currentSession, prisma };
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
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
