import { MessagesFeedProps } from "@/src/typescriptTypes/props";
import { SelectedConversationContext } from "@/src/util/util";
import { Flex } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { FunctionComponent as FC, useContext } from "react";
import { MessageItem } from "./MessageItem";

export const MessagesFeed: FC<MessagesFeedProps> = ({
  allMessagesFromThisConversation,
}) => {
  const selectedConversationId = useContext(
    SelectedConversationContext
  ) as string;
  const { data: currentSession } = useSession();

  return (
    <Flex direction="column-reverse" overflowY="scroll" height="100%">
      {allMessagesFromThisConversation &&
        allMessagesFromThisConversation.map((message) => (
          <MessageItem
            key={message.id}
            message={message}
            wasSentByCurrentUser={message.sender.id === currentSession?.user.id}
          />
        ))}
    </Flex>
  );
};
