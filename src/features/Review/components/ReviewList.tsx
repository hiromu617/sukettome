import { VFC, useEffect, useState } from 'react';
import { Stack, Heading, Divider } from '@chakra-ui/react';
import { supabase } from '../../../libs/supabase-client';
import type { Review } from '../';
import { ReviewCard } from '../index';

type ReviewListProps = {
  productId: number;
};

export const ReviewList: VFC<ReviewListProps> = ({ productId }) => {
  const [reviewList, setReviewList] = useState<Review[]>([]);
  useEffect(() => {
    const fetchReviews = async () => {
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
        .eq('product_id', productId);
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
      <Heading size={'md'} color="gray.600" textAlign="left" mb={2}>
        レビュー
      </Heading>
      {reviewList.map((review) => {
        return <ReviewCard review={review} key={review.id} />;
      })}
    </Stack>
  );
};
