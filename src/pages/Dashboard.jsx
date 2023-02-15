import { AddIcon, CheckIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, IconButton, Input, InputGroup, InputRightElement, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import TrelloCard from "../components/TrelloCard";
import { auth } from "../firebase/firebase";
import { useOutsideClick } from '@chakra-ui/react'

const Dashboard = () => {
  const authstate = useAuthState(auth);
  const navigate = useNavigate();

  // if (!authstate) navigate("/register");
  // React.useEffect(() => {
  //   console.log(authstate);
  // }, [authstate]);

  const sampleData = [
    {
      title: "💡 Ideas",
      cards: [
        {
          name: "create new react components",
          completed: false,
          tags: [{ name: "figma", color: "red" }],
          notes:[{username:'usernames',note:'finish this project pls'}]
        },
      ],
    },
  ];

  return (
    <Layout>
      
      <Flex w={'100%'}  >
      <TrelloCard data={sampleData}/>

    <CreateList>
        <IconButton 
        
        pos={'fixed'} top={'11%'} right={'1%'} colorScheme={'twitter'} icon={<AddIcon />}/>
      
      
    </CreateList>
      </Flex>
    </Layout>
  );
};

export default Dashboard;

function CreateList({children}){
const [showInput, setshowInput] = useState(false)
const ref = React.useRef()

useOutsideClick({
  ref: ref,
  handler: () => setshowInput(false),
})

  return <>

  <Box ref={ref}  onClick={()=>setshowInput(true)} >
    {showInput?<Box  pos={'fixed'} top={'11%'} right={'1%'}  ref={ref}>
    <InputGroup size='md'>
      <Input
        pr='5rem'
        placeholder='title'
      />
      <InputRightElement width='4.5rem'>
       <IconButton icon={<CheckIcon
       />}/>
      </InputRightElement>
    </InputGroup>
    </Box>:children}
    
  </Box>
  
  </>

}



