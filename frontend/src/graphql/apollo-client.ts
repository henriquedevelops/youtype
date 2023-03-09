import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import { getSession } from "next-auth/react";

/* Endpoint that the apollo client will send 
  the queries and mutations to */
const httpLink = new HttpLink({
  uri: "http://localhost:5000/graphql",
  credentials: "include",
});

/* Endpoint that the apollo client will send 
  subscriptions to */
const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url: "ws://localhost:5000/graphql/subscriptions",

          /* The parameters passed during the connection initialisation. */
          connectionParams: async () => ({
            currentSession: await getSession(),
          }),
        })
      )
    : null;

/* Setting up front-end to support WebSockets */
const link =
  typeof window !== "undefined" && wsLink != null
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink,
        httpLink
      )
    : httpLink;

export const client = new ApolloClient({
  link,

  /* Built-in Apollo caching on the results of the queries */
  cache: new InMemoryCache(),
});

/* This file is exported to the "_app.tsx" file and then passed on to the Apollo provider */
