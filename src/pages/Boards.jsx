import { SettingsIcon } from "@chakra-ui/icons";
import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  Heading,
  HStack,
  IconButton,
  Input,
  Text,
  useAccordionItem,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { current } from "@reduxjs/toolkit";
import { set, ref as referance, onValue } from "firebase/database";
import { motion, animate, useAnimation } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { Colorpicker } from "../components/Colorpicker";
import { auth, RealtimeDB } from "../firebase/firebase";
import { setcurrentBoard } from "../redux/reducers";
import { remove } from "firebase/database";
import {
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
} from "@chakra-ui/react";
import DiagramTree from "../components/DiagramTree";

const Boards = () => {
  const [boards, setboards] = useState([]);
  const [color, setColor] = useState("gray.500");
  const [formValue, setformValue] = useState("");
  const [selected, setSelected] = useState("");
  const controls = useAnimation();
  const currentBoard = useSelector((state) => state.currentBoard.value);
  const toast = useToast();
  const dispatch = useDispatch();

  // needs useeffect to fetch boards
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) {
      return;
    }

    onValue(referance(RealtimeDB, `users/${user.uid}/boards`), (snapshot) => {
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
        `users/${user?.uid}/boards/${formValue}`
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
  useEffect(() => {
    console.log(currentBoard);
  }, [currentBoard]);

  return (
    <>
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
      <HStack justifyItems={"space-between"} w={"100%"} mt={10}>
        {boards?.map((item, index) => (
          <Box
            key={index}
            w={500}
            h={100}
            bg={item.color}
            animate={{ width: selected === item ? 100 : 200 }}
            transition={{ duration: 0.3 }}
            as={motion.div}
            cursor={"pointer"}
            borderRadius={"3xl"}
            position={"relative"}
          >
            <ChakraDrawer board={item}>
              <IconButton
                className="absolute top-0 right-0 -mt-2 -mr-2"
                size={"sm"}
                rounded={"full"}
                bg={"white"}
                icon={<SettingsIcon />}
              />
            </ChakraDrawer>
            <Center
              onClick={() => dispatch(setcurrentBoard(item.title))}
              h={"100%"}
              w={"100%"}
            >
              <Heading size={"md"} color={"white"}>
                {item.title}
              </Heading>
            </Center>
          </Box>
        ))}
      </HStack>
    </>
  );
};

export default Boards;

function ChakraDrawer({ children, board }) {
  const [user] = useAuthState(auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { title } = board;
  const currentBoard = useSelector((state) => state.currentBoard.value);

  const deleteBoard = async (title) => {
    try {
      remove(
        referance(RealtimeDB, `users/${user?.uid}/${currentBoard}/${title}`)
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    onValue(
      referance(RealtimeDB, `users/${user.uid}/${currentBoard}/${title}`),
      (snapshot) => {
        const data = snapshot.val();
        console.log(data);
      }
    );
  }, []);

  return (
    <>
      <div onClick={onOpen} ref={btnRef}>
        {children}
      </div>
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"full"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Editable defaultValue={title}>
              <EditablePreview bg={"gray.100"} />
              <EditableInput />
            </Editable>
          </DrawerHeader>

          <DrawerBody>
            <p>this is a tree</p>
            <DiagramTree />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={() => deleteBoard(title)}>
              Delete
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
