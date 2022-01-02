import { supabase } from '../../../libs/supabase-client';

export const useUpdateProductImage = () => {
  const updateProductImage = async (id: number, product_image_url: string) => {
    const { data, error, status } = await supabase
      .from('products')
      .update({ image_urls: [product_image_url] })
      .eq('id', id);

    if (error && status !== 406) {
      console.error(error);
      throw error;
    }

    if (data) {
      console.log('success!');
    }
  };

  return { updateProductImage };
};
