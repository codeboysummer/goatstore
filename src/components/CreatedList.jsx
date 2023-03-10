import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useOutsideClick,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, RealtimeDB } from "../firebase/firebase";
import React from "react";
import { useSelector } from "react-redux";
import { set, ref as referance, onValue } from "firebase/database";
import { AddIcon, CheckIcon } from "@chakra-ui/icons";

export function CreateList({ children }) {
  const [showInput, setshowInput] = useState(false);
  const [user] = useAuthState(auth);
  const toast = useToast();
  const ref = React.useRef();
  const currentBoard = useSelector((state) => state.currentBoard.value);

  const [title, settitle] = useState("");

  // need to pull data from before and combine it

  const CreateList = async () => {
    try {
      if (title?.length == 0)
        return toast({
          status: "info",
          title: "title must have a 1 character",
          duration: 2000,
        });
      await set(
        referance(
          RealtimeDB,
          `users/${user?.uid}/boards/${currentBoard}/lists/${title}`
        ),
        {
          title,
        }
      );

      toast({
        status: "success",
        title: `${title} was created`,
        duration: 1000,
      });
      settitle("");
    } catch (error) {
      console.log(error);
    }
  };

  useOutsideClick({
    ref: ref,
    handler: () => setshowInput(false),
  });

  return (
    <>
      <Box ref={ref} onClick={() => setshowInput(true)}>
        {showInput ? (
          <Box pos={"fixed"} top={"11%"} right={"1%"} ref={ref}>
            <InputGroup size="md">
              <Input
                onChange={(e) => settitle(e.target.value)}
                value={title}
                pr="5rem"
                placeholder="title"
              />
              <InputRightElement>
                <IconButton
                  onClick={() => CreateList()}
                  colorScheme={"whatsapp"}
                  icon={<CheckIcon />}
                />
              </InputRightElement>
            </InputGroup>
          </Box>
        ) : (
          <VStack pos={"fixed"} top={"11%"} right={"1%"}>
            <IconButton colorScheme={"twitter"} icon={<AddIcon />} />
          </VStack>
        )}
      </Box>
    </>
  );
}
