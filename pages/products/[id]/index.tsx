import type { NextPage, GetServerSideProps } from 'next';
import { supabase } from '../../../src/libs/supabase-client';
import type { Product } from '../../../src/features/Product';
import { ProductDetail, RelatedProductList } from '../../../src/features/Product';
import { ReviewList } from '../../../src/features/Review';
import { VStack } from '@chakra-ui/react';

type Props = {
  product: Product;
  relatedProducts: Product[];
};

const ProductId: NextPage<Props> = ({ product, relatedProducts }) => {
  return (
    <VStack>
      <ProductDetail product={product} />
      <ReviewList product={product} />
      <RelatedProductList products={relatedProducts} />
    </VStack>
  );
};

export default ProductId;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id as string;
  const { data, error, status } = await supabase
    .from('products')
    .select(
      `
  *,
  brands (
    *
  )
`
    )
    .eq('id', id)
    .single();
  if (error && status !== 406) {
    throw error;
  }
  const { data: relatedProducts } = await supabase
    .from('products')
    .select(
      `
  *,
  brands (
    *
  )
`
    )
    .eq('brand_id', data.brand_id)
    .neq('id', data.id)
    .range(0, 5);
  return {
    props: {
      product: data,
      relatedProducts: relatedProducts ? relatedProducts : [],
    },
  };
};
