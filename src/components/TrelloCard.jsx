import React, { useEffect, useRef, useState } from "react";
import { AddIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Card from "./Card";
import { VStack } from "@chakra-ui/react";
import { ChakraModal } from "./ChakraModal";
import { ref, update } from "firebase/database";
import { auth, RealtimeDB } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { motion } from "framer-motion";

const TrelloCard = ({ TrelloCardData }) => {
  const { title } = TrelloCardData;
  const { cards } = TrelloCardData;
  const [user] = useAuthState(auth);
  const [windowPos, setWindowPos] = useState({
    x: window.innerWidth,
    y: window.innerHeight,
  });
  const myRef = useRef(null);

  useEffect(() => {
    function handleResize() {
      setWindowPos({ x: window.innerWidth, y: window.innerHeight });
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [cardPos, setCardPos] = useState({ x: 0, y: 0 });
  const [cardSize, setCardSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const myDiv = myRef.current;
    const { x, y, width, height } = myDiv.getBoundingClientRect();
    setCardPos({ x, y });
    setCardSize({ width, height });
  }, []);

  const dragConstraints = {
    left: -cardPos.x,
    right: windowPos.x - cardPos.x - cardSize.width,
    top: -cardPos.y,
    bottom: windowPos.y - cardPos.y - cardSize.height,
  };

  const [cardsEmpty, setcardsEmpty] = useState(true);
  useEffect(() => {
    console.log("trellocard", cards);
  }, []);
  useEffect(() => {
    if (cards.length == 0) return setcardsEmpty(true);
    setcardsEmpty(false);
  }, [TrelloCardData, user]);

  return (
    <>
      <motion.div
        ref={myRef}
        drag={false}
        dragConstraints={dragConstraints}
        className=" bg-[#f3f3f3] w-72 h-fit rounded-lg p-1"
      >
        <div className=" flex items-center pt-2 pb-2 ">
          <p className=" text-gray-400 font-extrabold">
            <ChevronRightIcon
              cursor={"pointer"}
              _hover={{ color: "red" }}
              boxSize={7}
            />
          </p>{" "}
          💡 <p className="pl-2 font-bold">{title}</p>
        </div>

        {/* this the card */}

        <VStack>
          {cards?.map((card) => {
            return (
              <>
                <Card key={card} card={card} />
              </>
            );
          })}
          <ChakraModal cardsEmpty={cardsEmpty} cards={cards} title={title}>
            <AddIcon pt={1} cursor={"pointer"} color={"grey"} />
          </ChakraModal>
        </VStack>
      </motion.div>
    </>
  );
};

export default TrelloCard;
