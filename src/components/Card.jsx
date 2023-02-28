import {
  AddIcon,
  ChatIcon,
  CheckCircleIcon,
  CheckIcon,
  CloseIcon,
} from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Tag,
  useOutsideClick,
  VStack,
} from "@chakra-ui/react";
import { remove, ref as referance } from "firebase/database";
import { motion } from "framer-motion";
import randomColor from "randomcolor";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, RealtimeDB } from "../firebase/firebase";
const Card = ({ card, cardIndex, ParentTitle }) => {
  const [active, setactive] = React.useState(false);
  const { cardName, cardCompleted, tags } = card;
  const [user] = useAuthState(auth);
  const deleteCard = (cardIndex) => {
    try {
      remove(
        referance(
          RealtimeDB,
          `${user?.uid}/lists/${ParentTitle}/CreatedCard/cards/${cardIndex}`
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const ref = React.useRef();
  useOutsideClick({
    ref: ref,
    handler: () => setactive(false),
  });

  const collapsed = {
    padding: 2,
    borderRadius: 4,
    justifyContent: "center",
    background: "white",
    width: "95%",
  };
  const animate = {
    width: "90vw",
    height: "40vh",
    position: "absolute",
    marginLeft: "auto",
    marginRight: "auto",
    left: 0,
    right: 0,
    textAlign: "center",
    zIndex: 999,
    background: "black",
    color: "white",
  };

  return (
    <VStack
      ref={ref}
      onClick={() => setactive(true)}
      as={motion.div}
      {...collapsed}
      animate={active ? animate : ""}
    >
      <Flex w={"100%"} alignItems={"center"}>
        <p className="self-start  font-medium">{cardName}</p>
        {cardCompleted ? (
          <CheckIcon
            color={"grey"}
            onClick={() => {}}
            ml={"auto"}
            cursor={"pointer"}
          />
        ) : (
          <CheckCircleIcon
            onClick={() => {}}
            cursor={"pointer"}
            color={"green.400"}
            ml={"auto"}
          />
        )}
      </Flex>
      <Flex w={"100%"} flexWrap={"wrap"} gap={1} alignItems={"flex-start"}>
        {tags.map((item) => (
          <Tag
            key={item}
            color={"white"}
            bg={randomColor({ luminosity: "dark" })}
          >
            {item}
          </Tag>
        ))}
      </Flex>
      <Flex w={"100%"} alignItems={"center"} alignSelf={"start"}>
        <Avatar mr={-1} size={"xs"} />
        <Avatar size={"xs"} /> <ChatIcon ml={"auto"} />
      </Flex>
      {active && (
        <Button
          top={0}
          size={"sm"}
          right={1}
          position={"absolute"}
          colorScheme={"red"}
          onClick={() => deleteCard(cardIndex)}
        >
          delete
        </Button>
      )}
    </VStack>
  );
};

export default Card;
