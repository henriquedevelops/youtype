import { signOut } from "next-auth/react";
import { FunctionComponent as FC } from "react";
import { Button, Center, Flex, Box } from "@chakra-ui/react";
import { Session } from "next-auth";
import ListOfChats from "./ListOfChats";

interface wrapperChatsListProps {}

/* 
This wrapper component contains some core logic that can
be reused in its child components
*/

const WrapperChatsList: FC<wrapperChatsListProps> = () => {
  return (
    <Box width={{ base: "100%", md: "400px" }} bg="whiteAlpha.50" py={6} px={3}>
      <ListOfChats></ListOfChats>
    </Box>
  );
};

export default WrapperChatsList;
