import type { NextPage, GetServerSideProps } from 'next';
import { VStack } from '@chakra-ui/react';
import { supabase } from '../../src/libs/supabase-client';
import type { Product } from '../../src/features/Product';

type Props = {
  Products: Product[];
  keyword?: string;
  type?: string;
};

const ProductIndex: NextPage<Props> = ({ Products }) => {
  return <VStack spacing={16}></VStack>;
};

export default ProductIndex;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const keyword = context.query.keyword;
  const type = context.query.type;
  let query = supabase.from('products').select(
    `
      *,
    brands (
      *
    )
    `
  );
  if (keyword) {
    query = query.like('name', `%${keyword}%`);
  }
  if (type) {
    query = query.eq('type', `${type}`);
  }
  const { data, error, status } = await query;

  if (error && status !== 406) {
    throw error;
  }

  return {
    props: {
      Products: data,
      keyword: keyword,
      type: type,
    },
  };
};
