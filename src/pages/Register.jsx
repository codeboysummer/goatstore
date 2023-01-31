import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { setusernameIsValid, setemail, setpassword } from "../redux/reducers";
import { debounce } from "lodash";
import { auth, db, RegisterWithEmailandPassword } from "../firebase/firebase";
import RegisterationForm from "../components/RegisterationForm";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Register() {
  const UserAuth = useAuthState(auth);
  const Username = useSelector((state) => state.username.value);

  const emailInput = useSelector((state) => state.email.value);
  const passwordInput = useSelector((state) => state.password.value);
  const navigate = useNavigate();

  const toast = useToast();
  const usernameIsValid = useSelector((state) => state.usernameIsValid.value);

  const debouncedUsernameIsValid = debounce(async (username, callback) => {
    try {
      if (username.length == 0)
        return toast({
          status: "error",
          duration: 3000,
          title: "username field is empty!",
        });

      const docRef = doc(db, "usernames", username);
      const usernameDoc = await getDoc(docRef);
      if (usernameDoc.exists()) {
        // if found then its not valid
        dispatch(setusernameIsValid(false));
        console.log(usernameIsValid);
        toast({ status: "error", duration: 3000, title: "username is taken!" });

        callback(false);
        return;
      }
      // if not found then is valiad
      dispatch(setusernameIsValid(true));
      console.log(usernameIsValid);
      callback(true);
    } catch (error) {
      console.log(error);
      callback(false, error);
    }
  }, 500);

  const handleUsernameChange = (username) => {
    debouncedUsernameIsValid(username, (isValid, error) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log(`Username is ${isValid ? "valid" : "not valid"}`);
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    console.log(usernameIsValid);
  }, [usernameIsValid]);
  useEffect(() => {
    if (UserAuth) navigate("/dashboard");
    if (!UserAuth) navigate("login");
  }, [UserAuth]);
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  isInvalid={!usernameIsValid}
                  onChange={(e) => {
                    handleUsernameChange(e.target.value);
                  }}
                  type="text"
                />
              </FormControl>
            </HStack>

            <RegisterationForm />

            <Stack spacing={10} pt={2}>
              <Button
                isDisabled={!usernameIsValid}
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={() => {
                  RegisterWithEmailandPassword(
                    emailInput,
                    passwordInput,
                    Username,
                    navigate
                  );
                }}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user? <Link color={"blue.400"}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
