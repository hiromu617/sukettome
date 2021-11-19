import type { NextPage, GetServerSideProps } from 'next';
import { Box } from '@chakra-ui/layout';
import { supabase } from '../../src/libs/supabase-client';
import type { User } from '../../src/features/User';

type UserIdProps = {
  User: User;
};

const UserId: NextPage<UserIdProps> = ({ User }) => {
  return (
    <Box bg="red.500">
      <h1>{User.user_name}</h1>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id as string;
  const { data, error, status } = await supabase.from('users').select(`*`).eq('id', id).single();
  // console.log('data', data);
  if (error && status !== 406) {
    throw error;
  }
  return {
    props: {
      User: data,
    },
  };
};

export default UserId;
