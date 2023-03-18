import { ConversationItemProps } from "@/src/typescriptTypes/props";
import {
  formatParticipantsUsernames,
  formatRelativeLocale,
} from "@/src/util/util";
import { useMutation, useSubscription } from "@apollo/client";
import { Avatar, Box, Flex, Stack, Text } from "@chakra-ui/react";
import { formatRelative } from "date-fns";
import enUS from "date-fns/locale/en-US";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FunctionComponent as FC, useEffect, useState } from "react";
import conversationsOperations from "@/src/graphql/operations/conversation";
import { GoPrimitiveDot } from "react-icons/go";
import { toast } from "react-hot-toast";
import message from "@/src/graphql/operations/message";
import { ConversationUpdateData } from "@/src/typescriptTypes/conversation";

/* 
This component holds a single conversation item to be rendered on
the list of conversations and can be selected by the user
*/

const ConversationItem: FC<ConversationItemProps> = ({
  singleConversation,
}) => {
  const loggedUserId = useSession().data?.user.id;
  const nextRouter = useRouter();
  const selectedConversationId = useRouter().query.selectedConversationId;
  const { data: currentSession } = useSession();
  const [triggerMarkConversationMutation, {}] = useMutation<
    { markConversationAsRead: boolean },
    { selectedConversationId: string }
  >(conversationsOperations.Mutations.markConversationAsRead);

  const [thisConversation, setThisConversation] = useState(singleConversation);
  const [userSawLatestMessage, setUserSawLatestMessage] = useState<boolean>(
    thisConversation.participants.find(
      (participant) => participant.user.id === currentSession?.user.id
    )?.hasSeenLatestMessage ?? false
  );
  const { data: subscriptionData } = useSubscription<any, any>(
    conversationsOperations.Subscriptions.conversationUpdate
  );

  useEffect(() => {
    console.log(subscriptionData);

    subscriptionData?.conversationUpdate &&
      subscriptionData.conversationUpdate.id === thisConversation.id &&
      setThisConversation(subscriptionData.conversationUpdate);

    if (thisConversation.id === selectedConversationId) {
      setUserSawLatestMessage(true);
    } else if (
      !userSawLatestMessage &&
      subscriptionData?.conversationUpdate?.latestMessage?.id !==
        thisConversation.latestMessage?.id
    ) {
      setUserSawLatestMessage(true);
    }
  }, [subscriptionData]);

  console.log(singleConversation.updatedAt);

  /* Function that executes when the user clicks in one of the conversations
   from the list */
  const handleSelectConversation = async (selectedConversationId: string) => {
    /* Push the selected conversation id to the router query params */
    nextRouter.push({ query: { selectedConversationId } });

    try {
      await triggerMarkConversationMutation({
        variables: { selectedConversationId },
      });
      setUserSawLatestMessage(true);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <Stack
      direction="row"
      align="center"
      justify="space-between"
      p={3}
      cursor="pointer"
      borderRadius={4}
      bg={
        selectedConversationId === thisConversation.id
          ? "whiteAlpha.100"
          : "none"
      }
      _hover={{ bg: "whiteAlpha.100" }}
      position="relative"
      onClick={() => handleSelectConversation(thisConversation.id)}
    >
      <Avatar />
      <Flex justify="space-between" width="80%" height="100%">
        <Flex direction="column" width="70%" height="100%">
          <Text
            fontWeight={600}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {loggedUserId &&
              formatParticipantsUsernames(
                thisConversation.participants,
                loggedUserId
              )}
          </Text>
          {thisConversation.latestMessage && (
            <Box width="140%" maxWidth="360px">
              <Text
                color="whiteAlpha.700"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {thisConversation.latestMessage.body}
              </Text>
            </Box>
          )}
        </Flex>
        <Text
          color="whiteAlpha.700"
          textAlign="right"
          position="absolute"
          right={4}
        >
          {formatRelative(new Date(thisConversation.updatedAt), new Date(), {
            locale: {
              ...enUS,
              formatRelative: (token) =>
                formatRelativeLocale[
                  token as keyof typeof formatRelativeLocale
                ],
            },
          })}
        </Text>
      </Flex>
    </Stack>
  );
};

export default ConversationItem;
