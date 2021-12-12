import { VFC } from 'react';
import { Box, Text, Flex, Stack, Avatar, Spacer } from '@chakra-ui/react';
import type { Review } from '../';
import Link from 'next/link';
import { SkatingHistoryConst } from '../../User/index';
import { StarIcon } from '@chakra-ui/icons';
import Rating from 'react-rating';
import { format } from 'date-fns';

type ReviewCardProps = {
  review: Review;
};

export const ReviewCard: VFC<ReviewCardProps> = ({ review }) => {
  return (
    <Flex align="start" py={3}>
      <Link href={`/user/${review.users.id}`} passHref>
        <Avatar name={review.users.user_name} src={review.users.avatar_url} />
      </Link>
      <Stack px={2} flex="1">
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
          <Spacer />
          <Text color="gray.600" fontSize="sm" ml="3">
            {format(new Date(review.created_at), 'yyyy/MM/dd HH:mm')}
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
};
