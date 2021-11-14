import React, { useContext } from 'react';
import { useDisclosure } from '@chakra-ui/hooks';

export type LoginModalState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const LoginModalContext = React.createContext<LoginModalState>({} as LoginModalState);

export const useLoginModal = () => {
  return useContext(LoginModalContext);
};

type LoginModalProviderProps = {
  children: React.ReactNode;
};

export const LoginModalProvider: React.FC<LoginModalProviderProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <LoginModalContext.Provider value={{ isOpen: isOpen, onOpen: onOpen, onClose: onClose }}>
      {props.children}
    </LoginModalContext.Provider>
  );
};
