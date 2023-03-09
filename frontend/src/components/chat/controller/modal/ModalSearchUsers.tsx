import { ApolloError, useLazyQuery, useMutation } from "@apollo/client";
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
import userOperations from "@/src/graphql/operations/user";
import SearchResults from "./SearchResults";
import SelectedList from "./SelectedList";
import { toast } from "react-hot-toast";
import ConversationsOperations from "@/src/graphql/operations/conversation";
import {
  CreateConversationData,
  CreateConversationInput,
} from "@/src/typescriptTypes/conversation";
import {
  ModalSearchUsersProps,
  SearchUsersInput,
  SearchUsersResult,
  UserFound,
} from "@/src/typescriptTypes/users";
import { useRouter } from "next/router";

/* 
This modal is rendered when the user clicks on the button 
"Start a conversation" at the AllConversations component. 
*/

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

  /* Executing useLazyQuery hook on "searchUsers" query */
  const [
    triggerSearchUsersQuery,
    { data: dataSearchUsers, loading: loadingSearchUsers },
  ] = useLazyQuery<SearchUsersResult, SearchUsersInput>(
    userOperations.Queries.searchUsers
  );

  /* Executing useMutation hook on "createConversation" mutation */
  const [
    triggerCreateConversationMutation,
    { loading: loadingCreateConversation },
  ] = useMutation<CreateConversationData, CreateConversationInput>(
    ConversationsOperations.Mutations.createConversation
  );

  /* Next.JS router hook to push the conversation id into the URI query
   params when user creates a new conversation */
  const nextRouter = useRouter();

  /* Returns a list of users that username matches the targetUsername */
  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();

    await triggerSearchUsersQuery({
      variables: { targetUsername },
    });
  };

  /* Add user to the selected list */
  const handleSelectUser = (selectedUser: UserFound) => {
    setSelectedUsers((previous) => [...previous, selectedUser]);
    setTargetUsername("");
  };

  /* Remove user from the selected list */
  const handleUnselectUser = (userIdToUnselect: string) => {
    setSelectedUsers((previousUsers) =>
      previousUsers.filter((user) => user.id !== userIdToUnselect)
    );
  };

  /* Once user participants are selected, the Button
  The option "start a conversation" will be rendered */
  const handleCreateConversation = async () => {
    const participantsIds = selectedUsers.map((user) => user.id);
    try {
      /* When clicked,  will trigger the "createConversation"
      mutation passing the array of participant ids as an argument */
      const { data: dataCreateConversation } =
        await triggerCreateConversationMutation({
          variables: { participantsIds },
        });

      /* Checking so that Typescript can be happy  */
      if (!dataCreateConversation) {
        throw new Error("Failed to create conversation");
      }

      /* Extracting new conversation id from response */
      const conversationId =
        dataCreateConversation.createConversation.newConversationId;
      console.log(conversationId);

      /* Pushing new conversation id into the URI query params */
      nextRouter.push({ query: { conversationId } });

      /* Clear states and close modal */
      setSelectedUsers([]);
      setTargetUsername("");
      handleOpenCloseModal();
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  return (
    <>
      <Modal isOpen={modalIsOpen} onClose={handleOpenCloseModal}>
        <ModalOverlay />
        <ModalContent paddingBottom={3} bg="#2d2d2d">
          <ModalHeader>Select people</ModalHeader>
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
                  isLoading={loadingSearchUsers}
                >
                  Search
                </Button>
              </Stack>
            </form>
            {dataSearchUsers?.searchUsers && (
              <SearchResults
                searchUsersResult={dataSearchUsers.searchUsers}
                handleSelectUser={handleSelectUser}
              />
            )}
            {selectedUsers.length !== 0 && (
              <>
                <SelectedList
                  users={selectedUsers}
                  handleUnselectUser={handleUnselectUser}
                />
                <Button
                  bg="brand.100"
                  width="100%"
                  mt={6}
                  onClick={handleCreateConversation}
                  isLoading={loadingCreateConversation}
                >
                  Start Conversation
                </Button>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalSearchUsers;
