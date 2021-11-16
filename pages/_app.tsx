import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { AppProvider } from '../src/providers/app';
import { Layout } from '../src/components/Layout/Layout';
import { supabase } from '../src/libs/supabase-client';
import { Session } from '@supabase/supabase-js';

function MyApp({ Component, pageProps }: AppProps) {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(session);
      setSession(session);
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        // setLoading(true)
        const userid = session?.user?.id;
        const { data, error, status } = await supabase
          .from('users')
          .select(`*`)
          .eq('id', userid)
          .single();

        if (error && status !== 406) {
          throw error;
        }

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
        // setLoading(false)
      }
    };
    const insertNewUser = async (id: string, user_name: string, avatar_url: string) => {
      const { data, error } = await supabase
        .from('users')
        .insert([{ id: id, user_name: user_name, avatar_url: avatar_url }]);
      console.log(data);
      console.log(error);
    };

    if (session) {
      getUser();
    }
  }, [session]);

  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}
export default MyApp;
