import { Box } from "@chakra-ui/react";
import type { NextPage as Page, NextPageContext } from "next";
import { getSession } from "next-auth/react";
import MainPage from "../components/chat/MainPage";
import Login from "../components/login/Login";
import { HomeProps } from "../typescriptTypes/props";

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

/* If user is logged in send him to chat, if not, send him to login */
const Home: Page<HomeProps> = ({ currentSession }) => {
  return <Box>{currentSession?.user?.username ? <MainPage /> : <Login />}</Box>;
};

export default Home;
