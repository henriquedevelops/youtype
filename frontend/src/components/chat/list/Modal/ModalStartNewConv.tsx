import { signOut } from "next-auth/react";
import { FunctionComponent as FC } from "react";
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
} from "@chakra-ui/react";
import { Session } from "next-auth";

interface ModalStartNewConvProps {
  modalIsOpen: boolean;
  handleOpenCloseModal: () => void;
}

/* 
This modal is opened when the user clicks on the button 
"Start a conversation" at the chatsList index component. 
*/
const ModalStartNewConv: FC<ModalStartNewConvProps> = ({
  modalIsOpen,
  handleOpenCloseModal,
}) => {
  return (
    <>
      <Modal isOpen={modalIsOpen} onClose={handleOpenCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text> fasdfa</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalStartNewConv;
