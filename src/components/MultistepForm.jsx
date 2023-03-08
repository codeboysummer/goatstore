import React, { useCallback, useEffect, useState } from "react";
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
  Stack,
  Tag,
} from "@chakra-ui/react";

import { useToast } from "@chakra-ui/react";
import { addTag, setcardName, setTags } from "../redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import randomColor from "randomcolor";
import { ref, update } from "firebase/database";
import { auth, RealtimeDB } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { CloseIcon } from "@chakra-ui/icons";

const Form1 = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const dispatch = useDispatch();
  const handleChange = (event) => {
    dispatch(setcardName(event.target.value));
  };

  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Card name
      </Heading>
      <Stack>
        <FormLabel>Card Name</FormLabel>
        <Input
          onChange={(e) => handleChange(e)}
          type={"text"}
          placeholder={"enter your card name"}
        />
      </Stack>
    </>
  );
};

const Form2 = () => {
  const dispatch = useDispatch();

  const toast = useToast();
  const tags = useSelector((state) => state.tags.value);

  const handleChange = useCallback(
    debounce(async (event) => {
      const { value } = event.target;
      if (tags.length > 4) {
        return toast({ title: "limit of 5 reached" });
      }
      if (!value || value.length <= 2) {
        return toast({ title: "invalid input" });
      }

      dispatch(addTag(value));
      setTimeout(() => {}, 300); // dispatch the 'addTag' action with the input value
    }, 500),
    []
  );

  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Tags
      </Heading>
      <Stack gap={4}>
        <Input
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <Flex>
          {tags?.map((item) => (
            <Tag
              key={item}
              m={0.5}
              w={"fit-content"}
              color={"white"}
              bg={randomColor({ luminosity: "dark" })}
            >
              {item}
              <CloseIcon
                onClick={() => dispatch(setTags(tags.filter((i) => i != item)))}
                cursor={"pointer"}
                boxSize={2}
                ml={2}
              />
            </Tag>
          ))}
        </Flex>
      </Stack>
    </>
  );
};

const Form3 = () => {
  return <></>;
};

export default function MultiStepForm({ title, cards, cardsEmpty }) {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tags.value);
  const cardName = useSelector((state) => state.cardName.value);
  const cardCompeleted = useSelector((state) => state.cardCompleted.value);
  const currentBoard = useSelector((state) => state.currentBoard.value);
  useEffect(() => {
    console.log(title, cardName, cardCompeleted, tags);
  }, [cardName]);

  async function onSubmit(callback) {
    const CreatedCard = cardsEmpty
      ? {
          title,

          cards: [
            {
              cardName,
              cardCompeleted,
              tags,
            },
          ],
        }
      : {
          title,

          cards: [
            ...cards,
            {
              cardName,
              cardCompeleted,
              tags,
            },
          ],
        };

    try {
      await update(
        ref(RealtimeDB, `users/${user?.uid}/boards/${currentBoard}/TrelloCard`),
        {
          title,
          CreatedCard,
        }
      );
      callback();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        maxWidth={800}
        p={6}
        outline={"none"}
        m="10px auto"
        as="form"
      >
        <Progress
          hasStripe
          value={progress}
          mb="5%"
          mx="5%"
          isAnimated
        ></Progress>
        {step === 1 ? <Form1 /> : step === 2 ? <Form2 /> : <Form3 />}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress - 33.33);
                }}
                isDisabled={step === 1}
                colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%"
              >
                Back
              </Button>
              {step != 3 && (
                <Button
                  w="7rem"
                  onClick={() => {
                    setStep(step + 1);
                    if (step === 3) {
                      setProgress(100);
                    } else {
                      setProgress(progress + 33.33);
                    }
                  }}
                  colorScheme="teal"
                  variant="outline"
                >
                  Next
                </Button>
              )}
            </Flex>
            {step === 3 ? (
              <Button
                w="7rem"
                colorScheme="red"
                variant="solid"
                onClick={async () => {
                  onSubmit(dispatch(setTags([])));
                  toast({
                    title: "Account created.",
                    description: "We've created your account for you.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                  });
                }}
              >
                Submit
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  );
}
