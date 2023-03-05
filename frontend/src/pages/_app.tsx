import { ApolloProvider } from "@apollo/client/react";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { theme } from "../chakra/theme";
import { client } from "../graphql/apollo-client";

/* 
This file is responsible for providing the necessary context 
to the entire client-side 
*/

/* 
-"Component" refers to the actual page component that is being
rendered.
-"pageProps" refers to an object containing the initial props 
that will be passed to the Component.
*/
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  /* Wrapping the app with providers and making data globally
  available on the application
   */
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
          <Toaster />
        </SessionProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}
