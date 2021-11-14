import React, { VFC } from 'react';
import { Container, VStack, Box, Flex, Button, IconButton, Spacer } from '@chakra-ui/react';
import { Image } from '@chakra-ui/image';
import Link from 'next/link';
import { HamburgerIcon } from '@chakra-ui/icons';

export const Header: VFC = () => {
  return (
    <Box h="60px" bg="white" shadow="md" zIndex="banner" pos="sticky" top="0" w="100%">
      <Flex w="100%" h="100%" alignItems="center" justify="space-between" p="4">
        <IconButton
          variant="goast"
          mr={[0, 2]}
          color="gray.900"
          aria-label="Call Segun"
          size="lg"
          icon={<HamburgerIcon w="6" h="6" />}
        />
        <Link href="/" passHref>
          <Image src={'logo.png'} w="auto" h="24px" alt="logo" mb="1" />
        </Link>
        <Spacer display={['none', 'block']} />
        <Button
          color="white"
          bg="gray.900"
          _hover={{ bg: 'gray.500' }}
          onClick={() => alert('login')}
        >
          Login
        </Button>
      </Flex>
    </Box>
  );
};
