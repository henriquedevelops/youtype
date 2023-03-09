import { signOut } from "next-auth/react";
import { FunctionComponent as FC } from "react";
import { Button, Center, Flex, Box } from "@chakra-ui/react";
import { Session } from "next-auth";
import AllConversations from "./AllConversations";
import conversationsOperations from "../../../graphql/operations/conversation";
import { useQuery } from "@apollo/client";
import { getAllConversationData } from "@/src/typescriptTypes/conversation";

interface WrapAllConversationsProps {}

/* 
This wrapper component contains some core logic that can
be reused in its child components
*/

const WrapAllConversations: FC<WrapAllConversationsProps> = () => {
  /* Query hook that fetches all conversations from currently 
  authenticated user. It is executed when the component is mounted */
  const {
    data: getAllConversationsData,
    loading: isLoadingConversations,
    error: errorLoadingConversations,
  } = useQuery<getAllConversationData, never>(
    conversationsOperations.Queries.getAllConversations
  );

  console.log("aqui esta a data: ", getAllConversationsData);

  return (
    <Box width={{ base: "100%", md: "400px" }} bg="whiteAlpha.50" py={6} px={3}>
      <AllConversations></AllConversations>
    </Box>
  );
};

export default WrapAllConversations;
