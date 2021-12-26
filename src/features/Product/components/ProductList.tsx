import { VFC } from 'react';
import useSWRInfinite from 'swr/infinite';
import { supabase } from '../../../libs/supabase-client';
import { Stack } from '@chakra-ui/layout';
import { ProductListItem } from './ProductListItem';
import type { Product } from '../';

type Props = {
  key: string;
  keyword?: string;
  type?: string;
};

export const ProductList: VFC<Props> = ({ key, keyword, type }) => {
  const fetcher = async (pageIndex: number) => {
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

    // query = query.range(pageIndex * 4, pageIndex * 4 + 4);

    const { data, error, status } = await query;

    if (error && status !== 406) {
      console.log(error);
      return [];
    }
    if (data) {
      return data;
    }
    return [];
  };
  const getKey = (pageIndex: number, previousPageData: Product[]) => {
    if (previousPageData && !previousPageData.length) return null; // 最後に到達した
    return [key, pageIndex];
  };
  const { data, size, setSize } = useSWRInfinite(getKey, fetcher);

  if (!data) return <></>;

  return (
    <Stack mt={5} w="full" spacing={4}>
      {data.map((productList) => {
        return productList.map((product) => {
          return <ProductListItem key={product.id} product={product} />;
        });
      })}
    </Stack>
  );
};
