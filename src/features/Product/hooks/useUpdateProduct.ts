import { supabase } from '../../../libs/supabase-client';

export const useUpdateProduct = () => {
  const updateProduct = async (
    id: number,
    formdata: {
      name: string;
      product_link: string;
      detail: string;
      type: string;
      price: number;
      brand_id: number;
    }
  ) => {
    const { data, error, status } = await supabase
      .from('products')
      .update([
        {
          name: formdata.name,
          product_link: formdata.product_link,
          detail: formdata.detail,
          type: formdata.type,
          price: formdata.price,
          brand_id: formdata.brand_id,
        },
      ])
      .eq('id', id);

    if (error && status !== 406) {
      console.error(error);
      throw error;
    }

    if (data) {
      // console.log(data);
      console.log('success!');
    }
  };

  return { updateProduct };
};
