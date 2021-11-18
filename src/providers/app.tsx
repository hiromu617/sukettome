/**
 * 全Providerをまとめる
 */
import React, { VFC } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { LoginModalProvider } from '../features/Auth';
import { CurrentUserProvider } from '../features/User';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider: VFC<AppProviderProps> = ({ children }) => {
  return (
    <ChakraProvider>
      <CurrentUserProvider>
        <LoginModalProvider>{children}</LoginModalProvider>
      </CurrentUserProvider>
    </ChakraProvider>
  );
};
