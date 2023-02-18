import {
  AddIcon,
  ChatIcon,
  CheckCircleIcon,
  CheckIcon,
} from "@chakra-ui/icons";
import { Avatar, Box, Flex, HStack, Tag, VStack } from "@chakra-ui/react";
import randomColor from "randomcolor";
import React from "react";
const Card = ({ card }) => {
  const [active, setactive] = React.useState(false);
  const { cardName, cardCompleted, tags } = card;
  // React.useEffect(() => {
  //   console.log(cards);
  // }, []);

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
            onClick={() => setactive(!active)}
            ml={"auto"}
            cursor={"pointer"}
          />
        ) : (
          <CheckCircleIcon
            onClick={() => setactive(!active)}
            cursor={"pointer"}
            color={"green.400"}
            ml={"auto"}
          />
        )}
      </Flex>
      <HStack alignSelf={"start"}>
        {tags.map((item) => (
          <Tag color={"white"} bg={randomColor({ luminosity: "dark" })}>
            {item}
          </Tag>
        ))}
      </HStack>
      <Flex w={"100%"} alignItems={"center"} alignSelf={"start"}>
        <Avatar mr={-1} size={"xs"} />
        <Avatar size={"xs"} /> <ChatIcon ml={"auto"} />
      </Flex>
    </VStack>
  );
};

export default Card;
