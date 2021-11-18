/**
 * ページ遷移しても変化しない固定のUI
 */
import React, { VFC, useState, useEffect } from 'react';
import { Container, VStack } from '@chakra-ui/react';
import { Header } from './Header';
import { LoginModal, useSession } from '../../features/Auth';
import { supabase } from '../../libs/supabase-client';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: VFC<LayoutProps> = ({ children }) => {
  // todo: contextsで管理
  const [currentUser, setCurrentUser] = useState<any>(null);
  const { session } = useSession();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true)
        const userid = session?.user?.id;
        const { data, error, status } = await supabase
          .from('users')
          .select(`*`)
          .eq('id', userid)
          .single();

        if (error && status !== 406) {
          throw error;
        }
        console.log(data);
        if (data) {
          setCurrentUser(data);
        } else {
          if (!session?.user?.id) throw 'user.id is null';
          insertNewUser(
            session.user.id,
            session?.user?.user_metadata.full_name,
            session?.user?.user_metadata.avatar_url
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    };
    const insertNewUser = async (id: string, user_name: string, avatar_url: string) => {
      const { data, error } = await supabase
        .from('users')
        .insert([{ id: id, user_name: user_name, avatar_url: avatar_url }]);
      console.log(data);
      console.log(error);
    };
    console.log(session);
    if (session) {
      getUser();
    }
  }, [session]);

  return (
    <>
      <Header />
      <LoginModal />
      <VStack bg="gray.100" minH="100vh">
        <Container h="100%" py="8">
          {children}
        </Container>
      </VStack>
    </>
  );
};
