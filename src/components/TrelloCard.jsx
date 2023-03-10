import React, { useEffect, useRef, useState } from "react";
import { AddIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Card from "./Card";
import { Button, useOutsideClick, VStack } from "@chakra-ui/react";
import { ChakraModal } from "./ChakraModal";
import { ref, update } from "firebase/database";
import { auth, RealtimeDB } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { remove, ref as referance } from "firebase/database";
import CreateCardModal from "./CreateCardModal";

const TrelloCard = ({ TrelloCardData }) => {
  const { title } = TrelloCardData;
  const { cards } = TrelloCardData;
  const [user] = useAuthState(auth);
  const active = useSelector((state) => state.active.value);

  useEffect(() => {
    console.log(TrelloCardData);
  }, []);

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
  const [showDelete, setshowDelete] = useState(false);
  const ref = React.useRef();
  useOutsideClick({
    ref: ref,
    handler: () => setshowDelete(false),
  });

  useEffect(() => {
    if (cards?.length == 0) return setcardsEmpty(true);
    setcardsEmpty(false);
  }, [TrelloCardData, user]);

  const onDelete = (title) => {
    try {
      remove(referance(RealtimeDB, `users/${user?.uid}/boards/${title}`));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <motion.div
        ref={myRef}
        drag={active}
        dragConstraints={dragConstraints}
        className=" bg-[#f3f3f3] w-72 h-fit rounded-lg p-1"
      >
        <div ref={ref} className=" flex items-center pt-2 pb-2 ">
          <p className=" text-gray-400 font-extrabold">
            <motion.div onClick={() => setshowDelete(true)}>
              {" "}
              <ChevronRightIcon
                cursor={"pointer"}
                _hover={{ color: "red" }}
                boxSize={7}
              />
            </motion.div>
          </p>{" "}
          <AnimatePresence>
            {showDelete ? (
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  onClick={() => onDelete(title)}
                  size={"sm"}
                  as={motion.button}
                  colorScheme={"red"}
                >
                  Delete
                </Button>
              </motion.div>
            ) : (
              <p className="pl-2 font-bold">{title}</p>
            )}
          </AnimatePresence>
        </div>

        {/* this the card */}

        <VStack>
          {cards?.map((card, i) => {
            return (
              <>
                <Card key={i} cardIndex={i} card={card} ParentTitle={title} />
              </>
            );
          })}
          {/* <ChakraModal cardsEmpty={cardsEmpty} cards={cards} title={title}>
            <AddIcon pt={1} cursor={"pointer"} color={"grey"} />
          </ChakraModal> */}

          <CreateCardModal item={TrelloCardData}>
            <AddIcon pt={1} cursor={"pointer"} color={"grey"} />
          </CreateCardModal>
        </VStack>
      </motion.div>
    </>
  );
};

export default TrelloCard;
