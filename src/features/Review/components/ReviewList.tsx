import { VFC } from 'react';
import { Stack, Heading, Divider, Box, Button, Flex, Spinner } from '@chakra-ui/react';
import { supabase } from '../../../libs/supabase-client';
import type { Review } from '../';
import { ReviewCard } from '../index';
import Link from 'next/link';
import type { Product } from '../../Product';
import useSWRInfinite from 'swr/infinite';

type ReviewListProps = {
  product: Product;
};

const fetcher = async (productId: number, pageIndex: number) => {
  // product_idが一致するレビューを降順で0~5件取得
  const { data, error, status } = await supabase
    .from('reviews')
    .select(
      `
   *,
   users (
     *
   )
 `
    )
    .eq('product_id', productId)
    .order('id', { ascending: false })
    .range(pageIndex * 4, pageIndex * 4 + 4);
  if (error && status !== 406) {
    throw error;
  }
  if (data) {
    return data;
  }
  return [];
};

export const ReviewList: VFC<ReviewListProps> = ({ product }) => {
  const getKey = (pageIndex: number, previousPageData: Review[]) => {
    if (previousPageData && !previousPageData.length) return null; // 最後に到達した
    return [product.id, pageIndex];
  };
  const { data, size, setSize } = useSWRInfinite(getKey, fetcher);
  const isLast = data ? data.filter((list) => list.length < 5).length > 0 : false;

  if (!data)
    return (
      <Stack bg="white" shadow="lg" borderRadius="lg" w="full" p={5} divider={<Divider />}>
        <Flex align="center" justify="space-between">
          <Heading size={'md'} color="gray.600" textAlign="left" mb={2}>
            レビュー
          </Heading>
          <Link
            href={{
              pathname: `/products/${product.id}/reviews/new`,
              query: { name: product.name },
            }}
            passHref
          >
            <Button as="a" color="white" bg="gray.900" _hover={{ bg: 'gray.500' }}>
              レビューする
            </Button>
          </Link>
        </Flex>
        <Flex align="center" justify="center" my="2">
          <Spinner />
        </Flex>
      </Stack>
    );

  return (
    <Stack bg="white" shadow="lg" borderRadius="lg" w="full" p={5} divider={<Divider />}>
      <Flex align="center" justify="space-between">
        <Heading size={'md'} color="gray.600" textAlign="left" mb={2}>
          レビュー
        </Heading>
        <Link
          href={{
            pathname: `/products/${product.id}/reviews/new`,
            query: { name: product.name },
          }}
          passHref
        >
          <Button as="a" color="white" bg="gray.900" _hover={{ bg: 'gray.500' }}>
            レビューする
          </Button>
        </Link>
      </Flex>
      {data.map((reviewList) => {
        return reviewList.map((review) => {
          return <ReviewCard review={review} key={review.id} />;
        });
      })}
      {!isLast && (
        <Flex align="center" justify="center" mt="2">
          <Button
            onClick={() => setSize(size + 1)}
            as="a"
            color="white"
            bg="gray.900"
            _hover={{ bg: 'gray.500' }}
            disabled={isLast}
          >
            もっと読み込む
          </Button>
        </Flex>
      )}
    </Stack>
  );
};
