import { Button, Heading, Input, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import Layout from "../components/Layout";

const Boards = () => {
  // needs useeffect to fetch boards

  // need to create boards

  // so if boards are not there we ask the user to create them

  const [boards, setboards] = useState(true);

  // make this a component and keep track of of it buy a
  //global variable called current board which will the the name

  // of the current board

  const createBoard = async () => {
    try {
    } catch (error) {}
  };

  return (
    <Layout>
      <VStack w={"100%"}>
        <Heading>Welcome to trellow </Heading>
        <Text>lets start you off with your first board</Text>
        <Input bg={"white"} maxW={[200, 400, 500]} />
        <Button colorScheme={"green"}>Create</Button>
      </VStack>

      {!boards && <Heading>you dont have any boards right now !</Heading>}
    </Layout>
  );
};

export default Boards;
