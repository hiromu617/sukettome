import React, { VFC } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';
import { useLoginModal } from '..';
import { useUser } from '../hooks/useUser';

export const LoginModal: VFC = () => {
  const { isOpen, onClose } = useLoginModal();
  const { session, signOut, signInWithGoogle } = useUser();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          ログインすることで利用規約とプライバシーポリシーに同意したものとみなされます。
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={signInWithGoogle}>
            Login With Google
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
