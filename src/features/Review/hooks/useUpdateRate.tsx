import { supabase } from '../../../libs/supabase-client';

export const useUpdateRate = () => {
  const updateRate = async (productId: number, rate: number) => {
    const { data, error, status } = await supabase
      .from('reviews')
      .select('rate')
      .eq('product_id', productId);

    if (error && status !== 406) {
      console.error(error);
      throw error;
    }

    if (data) {
      const rates = data as [{ rate: number }];
      const sum = rates.map((object) => object.rate).reduce((prev, curr) => prev + curr);
      const avelage = (sum + rate) / (rates.length + 1);
      console.log(data);
      console.log(sum);
      console.log(avelage);
      if (avelage > 0) {
        const { data, error, status } = await supabase
          .from('products')
          .update({ rate: avelage })
          .eq('id', productId);
        if (error && status !== 406) {
          console.error(error);
          throw error;
        }
        console.log(data);
      }
    }
  };

  return { updateRate };
};
