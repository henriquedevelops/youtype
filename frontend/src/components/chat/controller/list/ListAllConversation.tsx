import { ListAllConversationsProps } from "@/src/typescriptTypes/props";
import { Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FunctionComponent as FC } from "react";
import ConversationItem from "./ConversationItem";

/* 
This component contains the list with all conversations from the currently 
authenticated user so that he can select one
*/

const ListAllConversations: FC<ListAllConversationsProps> = ({
  allConversations,
}) => {
  return (
    <>
      {!allConversations ? (
        <Flex>
          <Text>No conversations Found</Text>
        </Flex>
      ) : (
        allConversations.map((item) => (
          <ConversationItem key={item.id} singleConversation={item} />
        ))
      )}
    </>
  );
};

export default ListAllConversations;
