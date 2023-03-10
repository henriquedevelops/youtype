import conversationsOperations from "@/src/graphql/operations/conversation";
import {
  getAllConversationData,
  newValueUpdateQuery,
  PopulatedConversation,
} from "@/src/typescriptTypes/conversation";
import { useQuery } from "@apollo/client";
import { Flex } from "@chakra-ui/react";
import { FunctionComponent as FC, useEffect } from "react";
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
    subscribeToMore,
  } = useQuery<getAllConversationData, never>(
    conversationsOperations.Queries.getAllConversations
  );

  console.log("******************1", getAllConversationsData);

  /* Function responsible for updating the conversation list in real-time */
  const subscribeToNewConversations = () => {
    subscribeToMore({
      document: conversationsOperations.Subscriptions.conversationCreation,
      updateQuery: (
        previousValue,
        { subscriptionData: newValue }: newValueUpdateQuery
      ) => {
        if (!newValue) return previousValue;

        console.log("--------------", newValue);

        /* "getAllConversationsData" will be updated with the value returned
        here (which includes the new conversation when there is one) */
        return Object.assign({}, previousValue, {
          getAllConversations: [
            newValue.data.conversationCreation,
            ...previousValue.getAllConversations,
          ],
        });
      },
    });
  };

  /* Execute subscription to new conversations when mounting the component */
  useEffect(() => {
    subscribeToNewConversations();
  }, []);

  return (
    <>
      {!getAllConversationsData?.getAllConversations ? (
        <Flex>no conversations yet</Flex>
      ) : (
        getAllConversationsData?.getAllConversations.map((conversation) => (
          <ConversationItem key={conversation.id} conversation={conversation} />
        ))
      )}
    </>
  );
};

export default ListAllConversations;
