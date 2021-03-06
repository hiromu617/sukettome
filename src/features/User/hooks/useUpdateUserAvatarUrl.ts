import { supabase } from '../../../libs/supabase-client';
import { useCurrentUser } from '..';

export const useUpdateUserAvatarUrl = () => {
  const { setCurrentUser } = useCurrentUser();
  const updateUserAvatarUrl = async (id: string, avatar_url: string) => {
    const { data, error, status } = await supabase.from('users').update({avatar_url: avatar_url}).eq('id', id);

    if (error && status !== 406) {
      console.error(error)
      throw error;
    }

    if(data){
      setCurrentUser(data[0])
    }
  };

  return { updateUserAvatarUrl };
};
