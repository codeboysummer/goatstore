import {
  AddIcon,
  ChatIcon,
  CheckCircleIcon,
  CheckIcon,
  CloseIcon,
} from "@chakra-ui/icons";
import { Avatar, Box, Flex, HStack, Tag, VStack } from "@chakra-ui/react";
import randomColor from "randomcolor";
import React from "react";
import { auth } from "../firebase/firebase";
const Card = ({ card }) => {
  const [active, setactive] = React.useState(false);
  const { cardName, cardCompleted, tags } = card;

  function CompletedTask() {
    const user = auth.currentUser();
  }
  return (
    <VStack
      p={2}
      borderRadius={4}
      justifyContent={"center"}
      bg={"white"}
      w={"95%"}
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
    </VStack>
  );
};

export default Card;
