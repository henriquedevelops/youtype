import conversationsOperations from "@/src/graphql/operations/conversation";
import { getAllConversationData } from "@/src/typescriptTypes/conversation";
import { useQuery } from "@apollo/client";
import { Flex } from "@chakra-ui/react";
import { FunctionComponent as FC } from "react";
import ConversationItem from "./ConversationItem";

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
  const allConversations = getAllConversationsData?.getAllConversations;
  return (
    <>
      {!allConversations ? (
        <Flex>no conversations yet</Flex>
      ) : (
        allConversations.map((conversation) => (
          <ConversationItem key={conversation.id} conversation={conversation} />
        ))
      )}
    </>
  );
};

export default ListAllConversations;
