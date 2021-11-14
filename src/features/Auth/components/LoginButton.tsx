import React, { VFC } from 'react';
import { Button } from '@chakra-ui/react';
import { useLoginModal } from '..';

export const LoginButton: VFC = () => {
  const { onOpen } = useLoginModal();
  return (
    <Button color="white" bg="gray.900" _hover={{ bg: 'gray.500' }} onClick={onOpen}>
      Login
    </Button>
  );
};
