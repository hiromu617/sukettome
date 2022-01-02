import { VFC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCurrentUser } from '../../User';
import { supabase } from '../../../libs/supabase-client';
import useSWR from 'swr';

const fetcher = async (model: string, id: string) => {
  const { data, error, status } = await supabase.from(model).select('*').eq('id', id).single();
  if (error && status !== 406) {
    throw error;
  }
  return data;
};

export const ProductAdmin: VFC = () => {
  const router = useRouter();
  const id = router.query.id;
  const { currentUser } = useCurrentUser();
  const { data, error } = useSWR([`products`, id], fetcher);

  useEffect(() => {
    if (currentUser?.id !== process.env.NEXT_PUBLIC_ADMIN_USER_ID) router.replace('/');
  }, [router, currentUser]);

  if (!data || currentUser?.id !== process.env.NEXT_PUBLIC_ADMIN_USER_ID) return <>loading</>;

  if (error) return <>error occured</>;

  return <>{data.name}</>;
};
