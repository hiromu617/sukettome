/**
 * 全Providerをまとめる
 */
import React, { VFC } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { LoginModalProvider } from '../features/Auth';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider: VFC<AppProviderProps> = ({ children }) => {
  return (
    <ChakraProvider>
      <LoginModalProvider>{children}</LoginModalProvider>
    </ChakraProvider>
  );
};
