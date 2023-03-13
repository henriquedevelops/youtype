import { Box } from "@chakra-ui/react";
import type { NextPage as Page, NextPageContext } from "next";
import { Session } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import EntireChat from "../components/chat/EntireChat";
import Login from "../components/login";

/* Server-side rendering */
export async function getServerSideProps(context: NextPageContext) {
  /* Extracting current session information from incoming request */
  const currentSession = await getSession(context);

  /* Passing pre-rendered data to the page component as props */
  return {
    props: {
      currentSession,
    },
  };
}

interface HomeProps {
  currentSession: Session | null;
}

/* Main page component */
const Home: Page<HomeProps> = ({ currentSession }) => {
  /* If user is logged in send him to chat, if not, send him to login */
  return (
    <Box>{currentSession?.user?.username ? <EntireChat /> : <Login />}</Box>
  );
};

export default Home;
