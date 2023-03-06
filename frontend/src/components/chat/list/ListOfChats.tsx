import { signOut } from "next-auth/react";
import { FunctionComponent as FC, useState } from "react";
import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import StartConversationModal from "./Modal/ModalStartNewConv";
import ModalStartNewConv from "./Modal/ModalStartNewConv";

/* 
This component contains the list of chats from the 
currently authenticated user ordered by most recent
activity.

It also contains a button that when clicked opens a modal
to start a new conversation.
*/

interface ListOfChatsProps {}

const ListOfChats: FC<ListOfChatsProps> = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenCloseModal = () => {
    modalIsOpen ? setModalIsOpen(false) : setModalIsOpen(true);
    console.log(modalIsOpen);
  };
  return (
    <>
      <Button width="100%" onClick={handleOpenCloseModal}>
        Start new conversation
      </Button>
      {modalIsOpen ? (
        <ModalStartNewConv
          modalIsOpen={modalIsOpen}
          handleOpenCloseModal={handleOpenCloseModal}
        ></ModalStartNewConv>
      ) : null}
    </>
  );
};

export default ListOfChats;
