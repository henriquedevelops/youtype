import conversationsOperations from "@/src/graphql/operations/conversation";
import {
  getAllConversationData,
  newValueUpdateQuery,
  PopulatedConversation,
} from "@/src/typescriptTypes/conversation";
import { useQuery } from "@apollo/client";
import { Skeleton, SkeletonCircle } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FunctionComponent as FC, useEffect } from "react";
import toast from "react-hot-toast";
import ConversationItem from "./ConversationItem";

interface ListAllConversationsProps {
  getAllConversationsData: getAllConversationData | undefined;
}

/* 
This component is the list of all conversations from currently
authenticated user (from which he can choose the current conversation).
*/

const ListAllConversations: FC<ListAllConversationsProps> = ({
  getAllConversationsData,
}) => {
  /* Extracting currently selected conversation Id to highlight on the list */
  const nextRouter = useRouter();
  const selectedConversationId = nextRouter.query.selectedConversationId;

  /* Function clicks when the user clicks in one of the conversations
   from the list */
  const handleSelectConversation = async (selectedConversationId: string) => {
    /* Push the selected conversation id to the router query params */
    await nextRouter.push({ query: { selectedConversationId } });

    /* Mark the conversation as read */
  };

  return (
    <>
      {!getAllConversationsData?.getAllConversations ? (
        <Flex>No conversations Found</Flex>
      ) : (
        getAllConversationsData?.getAllConversations.map((item) => (
          <ConversationItem
            isSelected={item.id === selectedConversationId}
            key={item.id}
            conversation={item}
            handleSelectConversation={handleSelectConversation}
          />
        ))
      )}
      ;
    </>
  );
};

export default ListAllConversations;
