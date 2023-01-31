import React,{useState} from 'react'
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Button, FormControl, FormLabel, InputGroup, InputRightElement,Input } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setemail, setpassword } from "../redux/reducers";
import { useNavigate } from 'react-router-dom';

const RegisterationForm = () => {
  const emailInput = useSelector((state) => state.email.value);
  const passwordInput = useSelector((state) => state.password.value);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false)

  return (
    <>
      <FormControl id="email" isRequired>
        <FormLabel>Email address</FormLabel>
        <Input
          value={emailInput}
          onChange={(e) => dispatch(setemail(e.target.value))}
          type="email"
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            value={passwordInput}
            onChange={(e) => dispatch(setpassword(e.target.value))}
            type={showPassword ? "text" : "password"}
          />
          <InputRightElement h={"full"}>
            <Button
              variant={"ghost"}
              onClick={() => setShowPassword((showPassword) => !showPassword)}
            >
              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </>
  );
};

export default RegisterationForm;
