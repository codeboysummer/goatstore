import { AddIcon, ArrowBackIcon, CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FaUserFriends } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import TrelloCard from "../components/TrelloCard";
import { auth, RealtimeDB } from "../firebase/firebase";
import { useOutsideClick } from "@chakra-ui/react";
import {
  set,
  ref as referance,
  onValue,
  remove,
  update,
} from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import Boards from "./Boards";
import { setcurrentBoard } from "../redux/reducers";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [lists, setlists] = useState([]);
  const dispatch = useDispatch();
  const currentBoard = useSelector((state) => state.currentBoard.value);

  useEffect(() => {
    if (!user) {
      return;
    }

    onValue(
      referance(RealtimeDB, `users/${user.uid}/${currentBoard}`),
      (snapshot) => {
        const data = snapshot.val();
        if (!data) {
          setlists([]);
          return;
        }

        const lists = Object.entries(data).map(([key, value]) => {
          const title = value.title || key;

          const cardsData = value.CreatedCard?.cards;
          const cards = cardsData
            ? Object.entries(cardsData).map(([cardKey, cardValue]) => ({
                cardCompleted: cardValue.cardCompleted || false,
                cardName: cardValue.cardName || "",
                tags: cardValue.tags || [],
              }))
            : [];
          console.log(data);
          return { title, cards };
        });

        setlists(lists);
      }
    );
  }, [user]);

  useEffect(() => {
    console.log(currentBoard);
  }, [currentBoard]);

  return (
    <Layout>
      {currentBoard ? (
        <>
          <div className="flex flex-wrap gap-2 ">
            {/* <TrelloCard data={sampleData} /> */}

            <>
              {lists?.map((item) => (
                <TrelloCard TrelloCardData={item} />
              ))}

              <CreateList>
                <VStack pos={"fixed"} top={"11%"} right={"1%"}>
                  <IconButton colorScheme={"twitter"} icon={<AddIcon />} />
                </VStack>
              </CreateList>
              <IconButton
                pos={"fixed"}
                top={"11%"}
                left={"1%"}
                onClick={() => dispatch(setcurrentBoard(null))}
                colorScheme={"twitter"}
                icon={<ArrowBackIcon />}
              />
            </>
          </div>
        </>
      ) : (
        <>
          <Boards />
        </>
      )}
    </Layout>
  );
};

export default Dashboard;

// this is the blue button in the corner
function CreateList({ children }) {
  const [showInput, setshowInput] = useState(false);
  const [user] = useAuthState(auth);
  const toast = useToast();
  const ref = React.useRef();
  const currentBoard = useSelector((state) => state.currentBoard.value);

  const [title, settitle] = useState("");
  const CreateList = async () => {
    try {
      if (title.length == 0)
        return toast({
          status: "info",
          title: "title must have a 1 character",
          duration: 2000,
        });
      await set(
        referance(RealtimeDB, `users/${user?.uid}/boards/${currentBoard}`),
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
                  onClick={CreateList}
                  colorScheme={"whatsapp"}
                  icon={<CheckIcon />}
                />
              </InputRightElement>
            </InputGroup>
          </Box>
        ) : (
          children
        )}
      </Box>
    </>
  );
}
