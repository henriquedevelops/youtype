import conversationsOperations from "@/src/graphql/operations/conversation";
import {
  getAllConversationData,
  newValueUpdateConversationQuery,
  PopulatedConversation,
} from "@/src/typescriptTypes/conversation";
import { SelectedConversationContext } from "@/src/util/util";
import { useQuery } from "@apollo/client";
import { Box, Skeleton } from "@chakra-ui/react";
import { getTime } from "date-fns";
import { useRouter } from "next/router";
import {
  FunctionComponent as FC,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import ButtonStartConversation from "./ButtonStartConversation";
import ConversationItem from "./ConversationItem";

interface ConversationsControllerProps {}

/* 
This component is the left bar of the chat, it contains the button
"Start a conversation" and the list of all conversations from currently
authenticated user (from which he can choose the current conversation).
*/

const ConversationsController: FC<ConversationsControllerProps> = () => {
  const selectedConversationId = useRouter().query.selectedConversationId;
  const [allConversations, setAllConversations] = useState<
    PopulatedConversation[]
  >([]);

  /* Query hook that fetches all conversations from currently 
  authenticated user. It is executed when the component is mounted */
  const {
    data: getAllConversationsData,
    loading: isLoadingConversations,
    subscribeToMore,
  } = useQuery<getAllConversationData, never>(
    conversationsOperations.Queries.getAllConversations,
    {
      onError: ({ message }) => {
        toast.error(message);
      },
    }
  );

  /* Execute subscription to new conversations when mounting the component */
  useEffect(() => {
    subscribeToNewConversations();
  }, []);

  /* Update the state of "allConversation" variable when the there is a 
  new conversation */
  useEffect(() => {
    getAllConversationsData?.getAllConversations &&
      setAllConversations(getAllConversationsData.getAllConversations);
  }, [getAllConversationsData?.getAllConversations]);

  /* Function responsible for updating the conversation list in real-time */
  const subscribeToNewConversations = () => {
    subscribeToMore({
      document: conversationsOperations.Subscriptions.conversationCreation,

      /* "getAllConversationsData" will be updated with the value returned
        from this function (which includes the new conversation when there 
        is one) */
      updateQuery: (
        previousValue,
        { subscriptionData: newValue }: newValueUpdateConversationQuery
      ) => {
        if (!newValue) return previousValue;

        return Object.assign({}, previousValue, {
          getAllConversations: [
            newValue.data.conversationCreation,
            ...previousValue.getAllConversations,
          ],
        });
      },
    });
  };

  const allConversationSorted = [...allConversations].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <>
      {isLoadingConversations ? (
        <Skeleton
          variant="rect"
          width="100%"
          height="100%"
          borderRadius={7}
          startColor="blackAlpha.400"
          endColor="whiteAlpha.200"
        />
      ) : (
        <Box
          display={{
            base: selectedConversationId ? "none" : "block",
            md: "block",
          }}
          width={{ base: "100%", md: "400px" }}
          bg="whiteAlpha.50"
          py={6}
          px={3}
        >
          <ButtonStartConversation />
          {allConversationSorted.map((item) => (
            <ConversationItem key={item.id} singleConversation={item} />
          ))}
        </Box>
      )}
    </>
  );
};

export default ConversationsController;
