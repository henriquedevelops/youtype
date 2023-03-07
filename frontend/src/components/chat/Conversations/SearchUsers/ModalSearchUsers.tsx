import { UserFound } from "@/src/util/types";
import { useLazyQuery } from "@apollo/client";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { FormEvent, FunctionComponent as FC, useState } from "react";
import userOperations from "../../../../graphql/operations/user";
import SearchResults from "./SearchResults";
import SelectedList from "./SelectedList";

/* 
This modal is opened when the user clicks on the button 
"Start a conversation" at the AllConversations component. 
*/

/*  Structure of this modal component props */
interface ModalSearchUsersProps {
  modalIsOpen: boolean;
  handleOpenCloseModal: () => void;
}

/* Structure of the argument that is passed to 
 the "triggerSearchUsersQuery" function */
interface SearchUsersInput {
  targetUsername: string;
}

/* Structure of the data that is returned by the 
  "triggerSearchUsersQuery" function*/
interface SearchUsersResult {
  searchUsers: Array<UserFound>;
}

const ModalSearchUsers: FC<ModalSearchUsersProps> = ({
  modalIsOpen,
  handleOpenCloseModal,
}) => {
  /* "targetUsername" is the value we receive from the input.
  It refers to the user that the currently signed-in user
  wants to chat with. */
  const [targetUsername, setTargetUsername] = useState("");

  /* This refers to the list of users that are going to be included
  on the conversation */
  const [selectedUsers, setSelectedUsers] = useState<Array<UserFound>>([]);

  const [triggerSearchUsersQuery, { data, loading, error }] = useLazyQuery<
    SearchUsersResult,
    SearchUsersInput
  >(userOperations.Queries.searchUsers);

  /* Add user to the selected list */
  const handleSelectUser = (selectedUser: UserFound) => {
    setSelectedUsers((previous) => [...previous, selectedUser]);
    setTargetUsername("");
  };

  /* Remove user from the selected list */
  const handleUnselectUser = (userId: string) => {
    setSelectedUsers((previous) => previous.filter((p) => p.id !== userId));
  };

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
            {data?.searchUsers && (
              <SearchResults
                searchUsersResult={data.searchUsers}
                handleSelectUser={handleSelectUser}
              />
            )}
            {selectedUsers.length !== 0 && (
              <SelectedList
                users={selectedUsers}
                handleUnselectUser={handleUnselectUser}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalSearchUsers;
