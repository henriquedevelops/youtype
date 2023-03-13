import { PopulatedConversation } from "@/src/typescriptTypes/conversation";
import { SelectedConversationContext } from "@/src/util/context";
import { Flex } from "@chakra-ui/react";
import { FunctionComponent as FC, useContext } from "react";
import { Header } from "./Header";
import { MessageInputField } from "./MessageInputField";
import { MessagesFeed } from "./MessagesFeed";

/* 
Component that contains the feed with messages sent/received, 
the input to type a new message and the header with the name 
of the participants
*/

const SelectedConversation: FC = () => {
  const { selectedConversation } = useContext(SelectedConversationContext);

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
          <Header />
          <MessagesFeed />
          <MessageInputField />
        </Flex>
      ) : (
        <Flex>Nextype Messenger</Flex>
      )}
    </Flex>
  );
};

export default SelectedConversation;
