import React from "react";
import { AddIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Card from "./Card";
import { VStack } from "@chakra-ui/react";
import { ChakraModal } from "./ChakraModal";

const TrelloCard = ({ data }) => {
  const [{ title }] = data;
  const [{ cards }] = data;
 


  return (
    <div className=" bg-[#f3f3f3] w-80 h-fit rounded-lg p-3">
      <div className=" flex items-center pt-2 pb-2 ">
        <p className=" text-gray-400 font-extrabold">
          <ChevronRightIcon boxSize={7} />
        </p>{" "}
        💡 <p className="pl-2 font-bold">{title}</p>
      </div>

      {/* this the card */}

      <VStack>
        {cards.map((card) => (
          <Card cards={cards}  />
        ))}

        <ChakraModal>
          <AddIcon pt={1} cursor={"pointer"} color={"grey"} />
        </ChakraModal>
      </VStack>
    </div>
  );
};

export default TrelloCard;
