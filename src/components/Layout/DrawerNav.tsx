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
  IconButton,
} from '@chakra-ui/react';
import { useSession } from '../../features/Auth';
import { useShowToast } from '../../hooks/useShowToast';
import Link from 'next/link';
import { FcSettings, FcPrivacy, FcViewDetails, FcHome } from 'react-icons/fc';
import { useCurrentUser } from '../../features/User';

type DrawerNavProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Links = [
  { title: 'ホーム', route: '/', icon: FcHome },
  { title: '利用規約', route: '/terms', icon: FcViewDetails },
  { title: 'プライバシーポリシー', route: '/policy', icon: FcPrivacy },
  { title: '設定', route: '/settings/profile', icon: FcSettings },
];

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
              {Links.map((LinkItem) => {
                return (
                  <Link href={LinkItem.route} passHref key={LinkItem.title}>
                    <Button
                    justifyContent="start"
                      leftIcon={<Icon as={LinkItem.icon} w={6} h={6} />}
                      colorScheme="black"
                      variant="link"
                    >
                      {LinkItem.title}
                    </Button>
                  </Link>
                );
              })}
              {currentUser && <Button onClick={handleSignOut}>Sign Out</Button>}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
