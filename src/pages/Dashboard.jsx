import { AddIcon, CheckIcon } from "@chakra-ui/icons";
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
} from "@chakra-ui/react";
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

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [lists, setlists] = useState([]);

  useEffect(() => {
    if (!user) {
      return;
    }

    onValue(referance(RealtimeDB, `${user.uid}/lists`), (snapshot) => {
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

        return { title, cards };
      });

      setlists(lists);
      console.log(lists);
    });
  }, [user]);

  return (
    <Layout>
      <div className="flex flex-wrap gap-2 ">
        {/* <TrelloCard data={sampleData} /> */}

        <>
          {lists?.map((item) => (
            <TrelloCard TrelloCardData={item} />
          ))}

          <CreateList>
            <IconButton
              pos={"fixed"}
              top={"11%"}
              right={"1%"}
              colorScheme={"twitter"}
              icon={<AddIcon />}
            />
          </CreateList>
        </>
      </div>
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

  const [title, settitle] = useState("");
  const CreateList = async () => {
    try {
      if (title.length == 0)
        return toast({
          status: "info",
          title: "title must have a 1 character",
          duration: 2000,
        });
      set(referance(RealtimeDB, `${user?.uid}/lists/${title}`), {
        title,
      });

      settitle("");
      toast({
        status: "success",
        title: `${title} was created`,
        duration: 1000,
      });
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
