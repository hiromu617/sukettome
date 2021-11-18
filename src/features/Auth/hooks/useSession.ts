import { useEffect, useState } from 'react';
import { supabase } from '../../../libs/supabase-client';
import { Session } from '@supabase/supabase-js';

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(session);
      setSession(session);
    });

    if (!session) {
      const s = supabase.auth.session();
      setSession(s);
    }

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
