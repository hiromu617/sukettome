import { VFC, useEffect, useState } from 'react';
import { Stack, Heading, Divider, Box, Button, Flex } from '@chakra-ui/react';
import { supabase } from '../../../libs/supabase-client';
import type { Review } from '../';
import { ReviewCard } from '../index';
import Link from 'next/link';

type ReviewListProps = {
  productId: number;
};

export const ReviewList: VFC<ReviewListProps> = ({ productId }) => {
  const [reviewList, setReviewList] = useState<Review[]>([]);
  useEffect(() => {
    const fetchReviews = async () => {
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
        .order('id', { ascending: true })
        .range(0, 5);
      if (error && status !== 406) {
        throw error;
      }
      // console.log(data)
      if (data) {
        setReviewList(data);
      }
    };
    fetchReviews();
  }, [productId]);

  return (
    <Stack bg="white" shadow="lg" borderRadius="lg" w="full" p={5} divider={<Divider />}>
      <Flex align="center" justify="space-between">
        <Heading size={'md'} color="gray.600" textAlign="left" mb={2}>
          レビュー
        </Heading>
        <Link href={`/products/${productId}/reviews/new`} passHref>
          <Button as="a" color="white" bg="gray.900" _hover={{ bg: 'gray.500' }}>
            レビューする
          </Button>
        </Link>
      </Flex>
      {reviewList.map((review) => {
        return <ReviewCard review={review} key={review.id} />;
      })}
    </Stack>
  );
};
