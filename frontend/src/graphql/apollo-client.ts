import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

// Setting up endpoint that we will send requests to
const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

export const client = new ApolloClient({
  link: httpLink,

  // Built-in Apollo caching on the results of the queries
  cache: new InMemoryCache(),
});

// This file is exported to the "_app.tsx" file and then passed on to the Apollo provider
