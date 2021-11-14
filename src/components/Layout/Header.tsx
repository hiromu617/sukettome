import React, { VFC } from 'react';
import { Container, VStack, Box, Flex, Button } from '@chakra-ui/react';
import { Image } from '@chakra-ui/image';
import Link from 'next/link';

export const Header: VFC = () => {
  return (
    <Box h="60px" bg="white" shadow="md" zIndex="banner" pos="sticky" top="0" w="100%">
      <Flex w="100%" h="100%" alignItems="center" justify="space-between" p="4">
        <Link href="/" passHref>
          <Image src={'logo.png'} w="auto" h="28px" alt="logo" />
        </Link>
        <Button colorScheme="gray" onClick={() => alert("login")}>Login</Button>
      </Flex>
    </Box>
  );
};
