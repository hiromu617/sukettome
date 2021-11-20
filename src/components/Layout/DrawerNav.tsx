import React, { VFC } from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  Flex,
  Icon,
  Text,
} from '@chakra-ui/react';
import { useSession } from '../../features/Auth';
import { useShowToast } from '../../hooks/useShowToast';
import Link from 'next/link';
import { FcSettings, FcPrivacy, FcViewDetails } from 'react-icons/fc';
import { useCurrentUser } from '../../features/User';

type DrawerNavProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const DrawerNav: VFC<DrawerNavProps> = ({ isOpen, onClose }) => {
  const { signOut } = useSession();
  const { showToast } = useShowToast();
  const { currentUser } = useCurrentUser();

  const handleSignOut = () => {
    signOut();
    onClose();
    showToast('ログアウトしました', '', 'success');
  };
  return (
    <>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody pt={10}>
            <Stack spacing={4}>
              {currentUser && (
                <Link href="/setteings/profile" passHref>
                  <Flex alignItems="center">
                    <Icon as={FcSettings} w={6} h={6} mr="2" />
                    <Text size="md" color="gray.600">
                      プロフィール設定
                    </Text>
                  </Flex>
                </Link>
              )}
              <Link href="/terms" passHref>
                <Flex alignItems="center">
                  <Icon as={FcViewDetails} w={6} h={6} mr="2" />
                  <Text size="md" color="gray.600">
                    利用規約
                  </Text>
                </Flex>
              </Link>
              <Link href="/pollicy" passHref>
                <Flex alignItems="center">
                  <Icon as={FcPrivacy} w={6} h={6} mr="2" />
                  <Text size="md" color="gray.600">
                    プライバシーポリシー
                  </Text>
                </Flex>
              </Link>
              {currentUser && <Button onClick={handleSignOut}>Sign Out</Button>}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
