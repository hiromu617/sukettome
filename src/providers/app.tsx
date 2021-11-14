/**
 * 全Providerをまとめる
 */
import React, { VFC } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

type AppProviderProps = {
  children: React.ReactNode
}

export const AppProvider: VFC<AppProviderProps> = ({children}) => {
  return (
    <ChakraProvider>
      {children}
    </ChakraProvider>
  )
}
