import { signOut } from "next-auth/react";
import { FunctionComponent as FC, useState } from "react";
import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import StartConversationModal from "./SearchUsers/ModalSearchUsers";
import ModalSearchUsers from "./SearchUsers/ModalSearchUsers";

/* 
This component contains the list of chats from the 
currently authenticated user ordered by most recent
activity.

It also contains a button that when clicked opens a modal
to start a new conversation.
*/

interface AllConversationsProps {}

const AllConversations: FC<AllConversationsProps> = () => {
  // This modal refers to the "ModalSearchUsers" component
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenCloseModal = () => {
    modalIsOpen ? setModalIsOpen(false) : setModalIsOpen(true);
  };
  return (
    <>
      <Button width="100%" onClick={handleOpenCloseModal}>
        Start new conversation
      </Button>
      {modalIsOpen ? (
        <ModalSearchUsers
          modalIsOpen={modalIsOpen}
          handleOpenCloseModal={handleOpenCloseModal}
        ></ModalSearchUsers>
      ) : null}
    </>
  );
};

export default AllConversations;
