import React, { VFC } from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { useSession } from '../../features/Auth';
import { useShowToast } from '../../hooks/useShowToast';

type DrawerNavProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const DrawerNav: VFC<DrawerNavProps> = ({ isOpen, onClose }) => {
  const { signOut } = useSession();
  const { showToast } = useShowToast();

  const handleSignOut = () => {
    signOut();
    onClose();
    showToast('ログアウトしました', '', 'success');
  };
  return (
    <>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <Button onClick={handleSignOut}>Sign Out</Button>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
