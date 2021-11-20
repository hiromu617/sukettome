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
import { useSession } from '../hooks/useSession';

export const LoginModal: VFC = () => {
  const { isOpen, onClose } = useLoginModal();
  const { signInWithGoogle } = useSession();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mx="4">
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
