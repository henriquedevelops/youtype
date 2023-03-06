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
import userOperations from "../../../../graphql/operations/user";
import { useLazyQuery, useQuery } from "@apollo/client";

/* 
This modal is opened when the user clicks on the button 
"Start a conversation" at the ListOfChats component. 
*/

// Structure of this modal component props
interface ModalStartNewConvProps {
  modalIsOpen: boolean;
  handleOpenCloseModal: () => void;
}

// Structure of the argument that is passed to the "triggerSearchUsersQuery" function
interface SearchUsersInput {
  targetUsername: string;
}

// Structure of the data that is returned by the "triggerSearchUsersQuery" function
interface SearchUsersResult {
  searchUsersResult: Array<{ id: string; username: string }>;
}

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

  const [triggerSearchUsersQuery, { data, loading, error }] = useLazyQuery<
    SearchUsersResult,
    SearchUsersInput
  >(userOperations.Queries.searchUsersByUsername);

  console.log("result of the search12:", data);

  /* Returns a list of users that username matches the
   targetUsername */
  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();

    await triggerSearchUsersQuery({
      variables: { targetUsername },
    });
  };
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
                <Button
                  type="submit"
                  disabled={!targetUsername}
                  isLoading={loading}
                >
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
