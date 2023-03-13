import { PopulatedConversation } from "@/src/typescriptTypes/conversation";
import { Flex } from "@chakra-ui/react";
import { FunctionComponent as FC } from "react";
import { Header } from "./Header";
import { MessageInputField } from "./MessageInputField";
import { MessagesFeed } from "./MessagesFeed";

interface SelectedConversationProps {
  selectedConversation: PopulatedConversation | undefined;
}

/* 
Component that contains the feed with messages sent/received, 
the input to type a new message and the header with the name 
of the participants
*/

const SelectedConversation: FC<SelectedConversationProps> = ({
  selectedConversation,
}) => {
  return (
    <Flex
      display={{ base: selectedConversation ? "flex" : "none", md: "flex" }}
      width="100%"
      direction="column"
    >
      {selectedConversation ? (
        <Flex
          direction="column"
          justify="space-between"
          overflow="hidden"
          flexGrow={1}
        >
          {selectedConversation && (
            <>
              <Header selectedConversation={selectedConversation} />
              <MessagesFeed />
              <MessageInputField />
            </>
          )}
        </Flex>
      ) : (
        <Flex>Nextype Messenger</Flex>
      )}
    </Flex>
  );
};

export default SelectedConversation;
