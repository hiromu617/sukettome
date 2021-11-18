import { supabase } from '../../../libs/supabase-client';
import { useCurrentUser } from '..';

/**
 * 新しいユーザーをインサートし、currentUseerにセットする
 */
export const useInsertNewUser = () => {
  const { setCurrentUser } = useCurrentUser();
  const insertNewUser = async (id: string, user_name: string, avatar_url: string) => {
    const { data, error, status } = await supabase
      .from('users')
      .insert([{ id: id, user_name: user_name, avatar_url: avatar_url }]);

    if (error && status !== 406) {
      console.error(error)
      throw error;
    }

    if (data) {
      setCurrentUser(data[0]);
    }
  };

  return { insertNewUser };
};
