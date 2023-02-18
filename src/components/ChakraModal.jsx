import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  FormLabel,
  Tag,
  Stack,
  Slide,
  HStack,
  CloseButton,
} from "@chakra-ui/react";
import { debounce } from "lodash";
import randomColor from "randomcolor";
import { useEffect, useState } from "react";
import SlideInOut from "../animations/SlideInOut";
import MultiStepForm from "./MultistepForm";

export function ChakraModal({ children, title }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box onClick={onOpen}>{children}</Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader> New card </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <MultiStepForm title={title} />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
