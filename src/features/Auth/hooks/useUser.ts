import { useEffect, useState } from 'react';
import { supabase } from '../../../libs/supabase-client';

export const useUser = () => {
  // Todo:型調べる
  const [session, setSession] = useState<any>();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(session)
      setSession(session);
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const signInWithGoogle = () => {
    supabase.auth.signIn({ provider: 'google' });
  };

  const signOut = () => {
    supabase.auth.signOut();
  };

  return {
    session,
    signInWithGoogle,
    signOut,
  } as const;
};
