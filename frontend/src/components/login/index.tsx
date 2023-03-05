import { signIn } from "next-auth/react";
import { FunctionComponent as FC, useState } from "react";
import { Button, Center, Stack, Text, Image, Input } from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import userOperations from "../../graphql/operations/user";
import {
  argumentSaveUsername,
  DataSaveUsername,
  LoginProps,
} from "@/src/util/types";
import toast from "react-hot-toast";

// Component that contains the login functionality
const Login: FC<LoginProps> = ({ currentSession, reloadSession }) => {
  const [inputUsername, setInputUsername] = useState("");

  // Creating the function that triggers the username mutation
  const [saveUsername, { loading, error }] = useMutation<
    DataSaveUsername,
    argumentSaveUsername
  >(userOperations.Mutations.saveUsernameGQL);

  // Handler for "onClick" in the save username button
  const handleSaveUsername = async () => {
    if (!inputUsername) return;
    try {
      // Triggering saveUsername mutation
      const { data } = await saveUsername({ variables: { inputUsername } });
      console.log(data);

      // Error handling
      if (!data?.saveUsernameMutation) {
        throw new Error();
      }
      if (data.saveUsernameMutation.error) {
        const {
          saveUsernameMutation: { error },
        } = data;
        throw new Error(error);
      }
      toast.success("Username succesfully saved ✔");

      // Automatically refetching the session
      reloadSession();
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <Center height="100vh">
      <Stack spacing={8} align="center">
        {currentSession ? (
          <>
            <Text fontSize="3xl">Create a Username</Text>
            <Input
              placeholder="Enter a username"
              value={inputUsername}
              onChange={(event) => setInputUsername(event.target.value)}
            />
            <Button
              width="100%"
              isLoading={loading}
              onClick={handleSaveUsername}
            >
              Save
            </Button>
          </>
        ) : (
          <>
            <Text fontSize="3xl">nextype</Text>
            <Button
              onClick={() => signIn("google")}
              leftIcon={<Image height="20px" src="/images/googlelogo.png" />}
            >
              Continue with Google
            </Button>
          </>
        )}
      </Stack>
    </Center>
  );
};

export default Login;
