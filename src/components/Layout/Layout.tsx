/**
 * ページ遷移しても変化しない固定のUI
 */
import React, { VFC, useState, useEffect } from 'react';
import { Container, VStack } from '@chakra-ui/react';
import { Header } from './Header';
import { LoginModal, useSession } from '../../features/Auth';
import { useGetCurrentUser } from '../../features/User';
import { useShowToast } from '../../hooks/useShowToast';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: VFC<LayoutProps> = ({ children }) => {
  const { session } = useSession();
  const [loading, setLoading] = useState(false);
  const { getCurrentUser } = useGetCurrentUser();
  const { showToast } = useShowToast();

  useEffect(() => {
    const handleGetCurrnetUser = async () => {
      try {
        setLoading(true);
        const userid = session?.user?.id;
        if (!userid) {
          throw 'userid not found';
        }
        getCurrentUser(userid, session);
        showToast('ログインしました', '', 'success');
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (session) {
      handleGetCurrnetUser();
    }
  }, [session]);

  return (
    <>
      <Header loading={loading} />
      <LoginModal />
      <VStack bg="gray.100" minH="100vh">
        <Container h="100%" py="8">
          {children}
        </Container>
      </VStack>
    </>
  );
};
