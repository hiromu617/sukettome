import { supabase } from '../../../libs/supabase-client';
import { useCurrentUser } from '..';
import { Session } from '@supabase/gotrue-js';
import { useInsertNewUser } from './useInsertNewUser';

/**
 * sessionからユーザーを取得する。いない場合はinsertNewUserを呼び出す
 */
export const useGetCurrentUser = () => {
  const { setCurrentUser } = useCurrentUser();
  const { insertNewUser } = useInsertNewUser();

  const getCurrentUser = async (userid: string, session: Session) => {
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
  };

  return { getCurrentUser };
};
