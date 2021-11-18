import React, { VFC } from 'react';
import {
  Box,
  Flex,
  Avatar,
  IconButton,
  Spacer,
  useDisclosure,
  SkeletonCircle,
} from '@chakra-ui/react';
import { Image } from '@chakra-ui/image';
import Link from 'next/link';
import { HamburgerIcon } from '@chakra-ui/icons';
import { DrawerNav } from './DrawerNav';
import { LoginButton } from '../../features/Auth';

type HeaderProps = {
  loading: boolean;
  currentUser: any;
};

export const Header: VFC<HeaderProps> = ({ loading, currentUser }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box h="60px" bg="white" shadow="md" zIndex="banner" pos="sticky" top="0" w="100%">
        <Flex w="100%" h="100%" alignItems="center" justify="space-between" p="4">
          <IconButton
            variant="goast"
            mr={[0, 2]}
            color="gray.900"
            aria-label="Call Segun"
            size="lg"
            icon={<HamburgerIcon w="6" h="6" />}
            onClick={onOpen}
          />
          <Link href="/" passHref>
            <Image src={'logo.png'} w="auto" h="24px" alt="logo" mb="1" />
          </Link>
          <Spacer display={['none', 'block']} />
          {loading && <SkeletonCircle size="10" />}
          {!loading && currentUser && (
            <Avatar name={currentUser.name} src={currentUser.avatar_url} />
          )}
          {!loading && !currentUser && <LoginButton />}
        </Flex>
      </Box>
      <DrawerNav isOpen={isOpen} onClose={onClose} />
    </>
  );
};
