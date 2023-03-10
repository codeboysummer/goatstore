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
import { setcurrentBoard, setcurrentList } from "../redux/reducers";
import { CreateList } from "../components/CreatedList";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [lists, setlists] = useState([]);
  const dispatch = useDispatch();
  const currentBoard = useSelector((state) => state.currentBoard.value);
  const currentList = useSelector((state) => state.currentList.value);

  useEffect(() => {
    if (!user || !currentBoard) {
      return;
    }

    onValue(
      referance(RealtimeDB, `users/${user?.uid}/${currentBoard}`),
      (snapshot) => {
        const data = snapshot.val();
        if (!data) {
          setlists([]);
          console.log("no data");
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
  function objectToArray(obj) {
    return Object.entries(obj).map(([key, value]) => ({
      key,
      title: value.title,
    }));
  }

  useEffect(() => {
    const listsRef = referance(
      RealtimeDB,
      `users/${user?.uid}/boards/${currentBoard}/lists`
    );
    onValue(listsRef, (snapshot) => {
      const data = snapshot.val();
      const myArray = objectToArray(data);

      console.log(myArray);
      setlists(myArray);
    });
  }, [currentBoard]);

  // useEffect(() => {

  //   onValue(
  //     referance(RealtimeDB, `users/${user?.uid}/boards/${currentBoard}`),
  //     (snapshot) => {
  //       const data = snapshot.val();

  //       console.log("data", data);

  //       dispatch(setcurrentList(data));
  //     },
  //     []
  //   );
  // }, [user, currentBoard]);

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

              <CreateList />

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
