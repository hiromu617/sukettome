import React, { VFC } from 'react';
import { Container, VStack } from '@chakra-ui/react';
import { Header } from './Header';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: VFC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <VStack bg="gray.100" minH="100vh">
        <Container h="100%" py="8">{children}</Container>
      </VStack>
    </>
  );
};
