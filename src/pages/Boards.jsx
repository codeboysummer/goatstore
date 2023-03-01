import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Input,
  Text,
  useAccordionItem,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { set, ref as referance, onValue } from "firebase/database";
import { rearg } from "lodash";
import randomColor from "randomcolor";
import React, { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { Colorpicker } from "../components/Colorpicker";
import Layout from "../components/Layout";
import { auth, RealtimeDB } from "../firebase/firebase";
import { setcurrentBoard } from "../redux/reducers";

const Boards = () => {
  const [boards, setboards] = useState([]);
  const [color, setColor] = useState("gray.500");

  // needs useeffect to fetch boards
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) {
      return;
    }

    onValue(referance(RealtimeDB, `${user.uid}/boards`), (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setboards([]);
        return;
      }

      const boardsArr = Object.entries(data).map(([key, value]) => ({
        id: key,
        title: value.boardTitle,
        color: value.color,
      }));

      console.log(boardsArr);

      setboards(boardsArr);
    });
  }, [user]);

  // need to create boards

  // so if boards are not there we ask the user to create them

  const [formValue, setformValue] = useState("");
  const toast = useToast();
  // make this a component and keep track of of it buy a
  //global variable called current board which will the the name

  // of the current board

  const createBoard = async (color) => {
    try {
      if (!formValue || formValue.length === 0)
        return toast({
          status: "info",
          title: "title must have a 1 character",
          duration: 2000,
        });

      const boardRef = referance(
        RealtimeDB,
        `${user?.uid}/boards/${formValue}`
      );
      await set(boardRef, { boardTitle: formValue, color: color });

      toast({
        status: "success",
        title: `${formValue} was created`,
        duration: 1000,
      });
      setformValue("");
    } catch (error) {
      console.log(error);
    }
  };
  const bgStyle = {
    background: `linear-gradient(to right, ${randomColor()}, ${randomColor()})`,
  };
  const dispatch = useDispatch();

  return (
    <Layout>
      <VStack w={"100%"}>
        <Heading>Welcome to trellow </Heading>
        <Text>lets start you off with your first board</Text>
        <Input
          value={formValue}
          onChange={(e) => setformValue(e.target.value)}
          bg={"white"}
          maxW={[200, 400, 500]}
        />
        <HStack>
          <Button onClick={() => createBoard(color)} colorScheme={"green"}>
            Create
          </Button>
          <Colorpicker color={color} setColor={setColor} />
        </HStack>
      </VStack>

      {boards.length == 0 && (
        <VStack w={"100%"}>
          <Heading size={"sm"} color={"gray.400"}>
            you dont have any boards right now !
          </Heading>
        </VStack>
      )}
      <Heading>Boards</Heading>
      <HStack mt={10}>
        {boards?.map((item) => (
          <Box
            bg={item.color}
            cursor={"pointer"}
            w={40}
            borderRadius={"3xl"}
            h={40}
            onClick={() => dispatch(setcurrentBoard(item.id))}
          >
            <Center h={"100%"} w={"100%"}>
              <Heading size={"md"} color={"white"}>
                {item.title}
              </Heading>
            </Center>
          </Box>
        ))}
      </HStack>
    </Layout>
  );
};

export default Boards;
