import { AddIcon, ChatIcon, CheckCircleIcon, CheckIcon } from "@chakra-ui/icons";
import { Avatar, Box, Flex, HStack, Tag, VStack } from "@chakra-ui/react";
import React from "react";
const Card = () => {
  const [active, setactive] = React.useState(false);
  return (
    <VStack
      p={2}
      borderRadius={4}
      justifyContent={"center"}
      bg={"white"}
      w={"95%"}
    >
      <Flex w={"100%"} alignItems={"center"}>
        <p className="self-start  font-medium">Create new Components</p>
        {active ? (
          <CheckIcon color={'grey'} onClick={()=>setactive(!active)} ml={"auto"} cursor={"pointer"} />
        ) : (
          <CheckCircleIcon onClick={()=>setactive(!active)} cursor={"pointer"} color={"green.400"} ml={"auto"} />
        )}
      </Flex>
      <HStack alignSelf={"start"}>
        <Tag variant={"solid"} colorScheme={"blue"}>
          hello
        </Tag>
        <Tag variant={"solid"} colorScheme={"facebook"}>
          hello
        </Tag>
      </HStack>
      <Flex w={"100%"} alignItems={"center"} alignSelf={"start"}>
        <Avatar mr={-1} size={"xs"} />
        <Avatar size={"xs"} /> <ChatIcon ml={"auto"} />
      </Flex>
      
    </VStack>
  );
};

export default Card;
