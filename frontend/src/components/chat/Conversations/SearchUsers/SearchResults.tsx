import { UserFound } from "@/src/util/types";
import { Avatar, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { FunctionComponent as FC } from "react";

interface SearchResultsProps {
  searchUsersResult: Array<{
    id: string;
    username: string;
  }>;
  handleSelectUser: (selectedUser: UserFound) => void;
}

/* 
This component is the list of users rendered on the 
"modalStartNewConv" as the result for the search
  */
const SearchResults: FC<SearchResultsProps> = ({
  searchUsersResult,
  handleSelectUser,
}) => {
  return (
    <>
      {searchUsersResult.length === 0 ? (
        <Flex mt={6} justify="center">
          <Text>No users found.</Text>
        </Flex>
      ) : (
        <Stack mt={6}>
          {searchUsersResult.map((user) => (
            <Stack
              key={user.id}
              direction="row"
              align="center"
              spacing={4}
              py={2}
              px={4}
              borderRadius={4}
              _hover={{ bg: "whiteAlpha.200" }}
            >
              <Avatar />
              <Flex justify="space-between" align="center" width="100%">
                <Text color="whiteAlpha.700">{user.username}</Text>
                <Button
                  bg="brand.100"
                  _hover={{ bg: "brand.100" }}
                  onClick={() => handleSelectUser(user)}
                >
                  Select
                </Button>
              </Flex>
            </Stack>
          ))}
        </Stack>
      )}
    </>
  );
};

export default SearchResults;
