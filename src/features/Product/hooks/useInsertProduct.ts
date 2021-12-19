import { supabase } from '../../../libs/supabase-client';

type ProductForm = {
  name: string;
  product_link: string;
  detail: string;
  type: string;
};

export const useInsertProduct = () => {
  const insertProduct = async (
    name: string,
    product_link: string,
    detail: string,
    type: string,
    price: number,
    image_urls: string[],
    brand_id: number
  ) => {
    const { data, error, status } = await supabase
      .from('products')
      .insert([
        {
          name: name,
          product_link: product_link,
          detail: detail,
          type: type,
          sport: 'skateboard',
          price: price,
          image_urls: image_urls,
          brand_id: brand_id,
        },
      ]);

    if (error && status !== 406) {
      console.error(error);
      throw error;
    }

    if (data) {
      // console.log(data);
      console.log('success!')
    }
  };

  return { insertProduct };
};
