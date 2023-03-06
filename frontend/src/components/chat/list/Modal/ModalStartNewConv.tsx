import { signOut } from "next-auth/react";
import { FunctionComponent as FC, FormEvent, useState } from "react";
import {
  Button,
  Text,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Modal,
  Stack,
  Input,
} from "@chakra-ui/react";
import { Session } from "next-auth";

interface ModalStartNewConvProps {
  modalIsOpen: boolean;
  handleOpenCloseModal: () => void;
}

/* 
This modal is opened when the user clicks on the button 
"Start a conversation" at the ListOfChats component. 
*/
const ModalStartNewConv: FC<ModalStartNewConvProps> = ({
  modalIsOpen,
  handleOpenCloseModal,
}) => {
  /*  
  "targetUsername" is the value we receive from the input.
  It refers to the user that the currently signed-in user
  wants to chat with. 
  */
  const [targetUsername, setTargetUsername] = useState("");

  // Returns a list of users that username matches the target
  const handleSearch = async (event: FormEvent) => {};
  return (
    <>
      <Modal isOpen={modalIsOpen} onClose={handleOpenCloseModal}>
        <ModalOverlay />
        <ModalContent bg="#2d2d2d">
          <ModalHeader>Select someone</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSearch}>
              <Stack spacing={4}>
                <Input
                  placeholder="Enter a username"
                  value={targetUsername}
                  onChange={(event) => setTargetUsername(event.target.value)}
                />
                <Button type="submit" disabled={!targetUsername}>
                  Search
                </Button>
              </Stack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalStartNewConv;
