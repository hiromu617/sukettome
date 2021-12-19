import type { NextPage, GetServerSideProps } from 'next';
import { supabase } from '../src/libs/supabase-client';
import type { Product } from '../src/features/Product';
import { HStack } from '@chakra-ui/react';
import { ProductCard } from '../src/features/Product';

type Props = {
  Products: Product[];
};

const Home: NextPage<Props> = ({ Products }) => {
  return (
    <HStack spacing={[4, 8]} overflowX="auto" py={10}>
      {Products.map((product, i) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </HStack>
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
