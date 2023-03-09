import conversationsOperations from "@/src/graphql/operations/conversation";
import { getAllConversationData } from "@/src/typescriptTypes/conversation";
import { useQuery } from "@apollo/client";
import { Flex } from "@chakra-ui/react";
import { FunctionComponent as FC } from "react";

interface ListAllConversationsProps {}

/* 
This component is the list of all conversations from currently
authenticated user (from which he can choose the current conversation).
*/

const ListAllConversations: FC<ListAllConversationsProps> = () => {
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

  return <Flex>whats up</Flex>;
};

export default ListAllConversations;
