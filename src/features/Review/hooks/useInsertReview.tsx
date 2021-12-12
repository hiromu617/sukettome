import { supabase } from '../../../libs/supabase-client';

export const useInsertReview = () => {
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
      console.log(data);
    }
  };

  return { insertReview };
};
