import { supabase } from '../../../libs/supabase-client';
import { useCurrentUser } from '..';

// TOdo: 共通か
type UserForm = {
  user_name: string;
  bio: string;
  sex: string;
  skating_history: number;
};

export const useUpdateUserAvatarUrl = () => {
  const { setCurrentUser } = useCurrentUser();
  const updateUserAvatarUrl = async (id: string, avatar_url: string) => {
    const { data, error, status } = await supabase.from('users').update({avatar_url: avatar_url}).eq('id', id);

    if (error && status !== 406) {
      console.error(error)
      throw error;
    }

    if(data){
      console.log(data)
      setCurrentUser(data[0])
    }
  };

  return { updateUserAvatarUrl };
};
