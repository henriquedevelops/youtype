import { UserFound } from "@/src/util/types";
import { CloseIcon } from "@chakra-ui/icons";
import { Flex, Stack, Text } from "@chakra-ui/react";
import { FunctionComponent as FC } from "react";

/* This component is rendered when the current user
select one or more users to include in the new conversation

It contains a list of all selected users */

interface SelectedListProps {
  users: Array<UserFound>;
  handleUnselectUser: (userId: string) => void;
}

const SelectedList: FC<SelectedListProps> = ({ users, handleUnselectUser }) => {
  return (
    <Flex mt={8} gap="10px" flexWrap="wrap">
      {users.map((user) => (
        <Stack
          key={user.id}
          direction="row"
          align="center"
          bg="whiteAlpha.200"
          borderRadius={4}
          p={2}
        >
          <Text>{user.username}</Text>
          <CloseIcon boxSize={3} onClick={() => handleUnselectUser(user.id)} />
        </Stack>
      ))}
    </Flex>
  );
};

export default SelectedList;
