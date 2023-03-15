import { Button } from "@chakra-ui/react";
import { FunctionComponent as FC, useState } from "react";
import ModalSearchUsers from "./modal/ModalSearchUsers";

/* 
This component is the button "Start a conversation" when clicked opens a modal
to search and select user participants and create the conversation.
*/

const ButtonStartConversation: FC<{}> = () => {
  // This modal refers to the "ModalSearchUsers" component
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenCloseModal = () => {
    modalIsOpen ? setModalIsOpen(false) : setModalIsOpen(true);
  };
  return (
    <>
      <Button
        bgColor={"blackAlpha.400"}
        marginBottom={5}
        width="100%"
        onClick={handleOpenCloseModal}
      >
        Start a conversation
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

export default ButtonStartConversation;
