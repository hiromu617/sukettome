import type { NextPage, GetServerSideProps } from 'next';
import { supabase } from '../../src/libs/supabase-client';
import type { Product } from '../../src/features/Product';

type Props = {
  product: Product;
};

const ProductId: NextPage<Props> = ({ product }) => {
  return <>{product.id}</>;
};

export default ProductId;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id as string;
  const { data, error, status } = await supabase.from('products').select(`*`).eq('id', id).single();
  // console.log('data', data);
  if (error && status !== 406) {
    throw error;
  }
  return {
    props: {
      product: data,
    },
  };
};
