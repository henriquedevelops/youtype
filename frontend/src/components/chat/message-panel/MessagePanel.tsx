import { Flex } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FunctionComponent as FC } from "react";
import { HeaderMessagePanel } from "./HeaderMessagePanel";

interface MessagePanelProps {}

/* 

*/

const MessagePanel: FC<MessagePanelProps> = () => {
  const nextRouter = useRouter();
  const selectedConversationId = nextRouter.query
    .selectedConversationId as string;
  const loggedUserId = useSession().data?.user.id;

  return (
    <Flex
      display={{ base: selectedConversationId ? "flex" : "block" }}
      width="100%"
      direction="column"
    >
      {selectedConversationId ? (
        <Flex
          direction="column"
          justify="space-between"
          overflow="hidden"
          flexGrow={1}
          border="1px solid red"
        >
          <HeaderMessagePanel selectedConversationId={selectedConversationId} />
          Messages here
        </Flex>
      ) : (
        <Flex>Nextype Messenger</Flex>
      )}
    </Flex>
  );
};

export default MessagePanel;
