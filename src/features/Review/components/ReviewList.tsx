import { VFC, useEffect, useState } from 'react';
import { Box, Text, Flex, Stack, Heading, Divider, Avatar } from '@chakra-ui/react';
import { supabase } from '../../../libs/supabase-client';
import type { Review } from '../';
import Link from 'next/link';
import { SkatingHistoryConst } from '../../User/index';
import { StarIcon } from '@chakra-ui/icons';
import Rating from 'react-rating';

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
        return (
          <Flex align="start" key={review.id} py={3}>
            <Link href={`/user/${review.users.id}`} passHref>
              <Avatar name={review.users.user_name} src={review.users.avatar_url} />
            </Link>
            <Stack px={2}>
              <Flex align="center">
                <Link href={`/user/${review.users.id}`} passHref>
                  <Text fontSize={'lg'} color="gray.600" fontWeight="bold">
                    {review.users.user_name}
                  </Text>
                </Link>
                <Text
                  fontSize={'sm'}
                  color={review.users.sex === '男性' ? 'blue.500' : 'red.500'}
                  fontWeight="bold"
                  ml="3"
                >
                  {review.users.sex}
                </Text>
                <Text color="gray.600" fontSize="sm" ml="3">
                  skate歴
                  <span style={{ fontWeight: 'bold' }}>
                    {typeof review.users.skating_history === 'number' &&
                    SkatingHistoryConst[review.users.skating_history]!
                      ? SkatingHistoryConst[review.users.skating_history]
                      : '未設定'}
                  </span>
                </Text>
              </Flex>
              <Rating
                initialRating={review.rate}
                readonly
                emptySymbol={<StarIcon boxSize={4} color="gray.100" />}
                fullSymbol={<StarIcon boxSize={4} color="yellow.300" />}
              />
              <Box py={4}>
                <Text>{review.body}</Text>
              </Box>
            </Stack>
          </Flex>
        );
      })}
    </Stack>
  );
};
