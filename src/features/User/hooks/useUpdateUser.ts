import { supabase } from '../../../libs/supabase-client';
import { useCurrentUser } from '..';

// TOdo: 共通か
type UserForm = {
  user_name: string;
  bio: string;
  sex: string;
  skating_history: number;
};

export const useUpdateUser = () => {
  const { setCurrentUser } = useCurrentUser();
  const updateUser = async (id: string, formData: UserForm) => {
    const { data, error, status } = await supabase.from('users').update(formData).eq('id', id);

    if (error && status !== 406) {
      console.error(error)
      throw error;
    }

    if(data){
      setCurrentUser(data[0])
    }
  };

  return { updateUser };
};
