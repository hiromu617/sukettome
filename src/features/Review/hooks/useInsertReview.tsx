import { supabase } from '../../../libs/supabase-client';
import { useUpdateRate } from './useUpdateRate';

export const useInsertReview = () => {
  const { updateRate } = useUpdateRate();
  const insertReview = async (body: string, rate: number, product_id: number, user_id: string) => {
    const { data, error, status } = await supabase.from('reviews').insert([
      {
        body: body,
        rate: rate,
        user_id: user_id,
        product_id: product_id,
      },
    ]);

    if (error && status !== 406) {
      console.error(error);
      throw error;
    }

    if (data) {
      updateRate(product_id, rate)
    }
  };

  return { insertReview };
};
