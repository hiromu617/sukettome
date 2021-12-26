import type { NextPage, GetServerSideProps } from 'next';
import { supabase } from '../src/libs/supabase-client';
import { Product, ProductListItem } from '../src/features/Product';
import { Stack } from '@chakra-ui/react';

type Props = {
  Products: Product[];
};

const Home: NextPage<Props> = ({ Products }) => {
  return (
    <Stack spacing={[4, 8]} py={10}>
      {Products.map((product, i) => {
        return <ProductListItem key={product.id} product={product} />;
      })}
    </Stack>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data, error, status } = await supabase.from('products').select(`
    *,
    brands (
      *
    )
  `);
  // console.log('data', data);
  if (error && status !== 406) {
    console.log(error);
    throw error;
  }
  return {
    props: {
      Products: data,
    },
  };
};
