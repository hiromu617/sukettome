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
import Image from 'next/image';
import Link from 'next/link';
import { HamburgerIcon, SearchIcon } from '@chakra-ui/icons';
import { DrawerNav } from './DrawerNav';
import { LoginButton } from '../../features/Auth';
import { useCurrentUser } from '../../features/User';

type HeaderProps = {
  loading: boolean;
};

export const Header: VFC<HeaderProps> = ({ loading }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentUser } = useCurrentUser();
  return (
    <>
      <Box h="60px" bg="white" shadow="md" zIndex="banner" pos="sticky" top="0" w="100%">
        <Flex w="100%" h="100%" alignItems="center" justify="space-between" p="4">
          <IconButton
            variant="goast"
            mr={[0, 2]}
            color="gray.900"
            aria-label="open Dialog"
            size="lg"
            icon={<HamburgerIcon w="6" h="6" />}
            onClick={onOpen}
          />
          <Link href="/" passHref>
            <Box h="24px">
              <Image src={'/logo.png'} layout="fixed" height="24" width="91" alt="logo" />
            </Box>
          </Link>
          <Spacer display={['none', 'block']} />
          <Flex alignItems="center">
            <Link href="/search" passHref>
              <IconButton
                variant="goast"
                mr={2}
                color="gray.500"
                aria-label="search"
                size="lg"
                icon={<SearchIcon w="5" h="5" />}
              />
            </Link>
            {loading && <SkeletonCircle size="10" />}
            {!loading && currentUser && (
              <Link href={`/user/${currentUser.id}`} passHref>
                <Avatar size={'sm'} name={currentUser.user_name} src={currentUser.avatar_url} />
              </Link>
            )}
            {!loading && !currentUser && <LoginButton />}
          </Flex>
        </Flex>
      </Box>
      <DrawerNav isOpen={isOpen} onClose={onClose} />
    </>
  );
};
