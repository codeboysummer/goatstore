import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  Box,
  ChakraProvider,
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Center,
  SimpleGrid,
  extendTheme,
  Input,
  Heading,
} from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Popover: {
      variants: {
        picker: {
          popper: {
            maxWidth: "unset",
            width: "unset",
          },
        },
      },
    },
  },
});

export function Colorpicker({ color, setColor }) {
  const colors = [
    "gray.500",
    "red.500",
    "gray.700",
    "green.500",
    "blue.500",
    "blue.800",
    "yellow.500",
    "orange.500",
    "purple.500",
    "pink.500",
  ];

  return (
    <>
      <Center marginTop={5}>
        <Popover variant="picker">
          <PopoverTrigger>
            <Button
              aria-label={color}
              background={color}
              height="25px"
              width="25px"
              padding={0}
              minWidth="unset"
              borderRadius={3}
            ></Button>
          </PopoverTrigger>
          <PopoverContent width="170px">
            <PopoverArrow bg={color} />
            <PopoverCloseButton color="white" />
            <PopoverHeader
              height="100px"
              backgroundColor={color}
              borderTopLeftRadius={5}
              borderTopRightRadius={5}
              color="white"
            ></PopoverHeader>
            <PopoverBody height="120px">
              <SimpleGrid columns={5} spacing={2}>
                {colors.map((c) => (
                  <Button
                    key={c}
                    aria-label={c}
                    background={c}
                    height="22px"
                    width="22px"
                    padding={0}
                    minWidth="unset"
                    borderRadius={3}
                    _hover={{ background: c }}
                    onClick={() => {
                      setColor(c);
                    }}
                  ></Button>
                ))}
              </SimpleGrid>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Center>
    </>
  );
}
