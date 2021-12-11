import { VFC } from 'react';
import type { Product } from '../';
import { Box, Text, Flex, Badge, Icon, Stack, Heading, Img } from '@chakra-ui/react';
import Link from 'next/link';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';

type Props = {
  product: Product;
};

interface RatingProps {
  rating: number;
}

function Rating({ rating }: RatingProps) {
  return (
    <Box d="flex" alignItems="center">
      {Array(5)
        .fill('')
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return (
              <Icon as={BsStarFill} key={i} ml={1} color={i < rating ? 'yellow.400' : 'gray.300'} />
            );
          }
          if (roundedRating - i === 0.5) {
            return <Icon as={BsStarHalf} color={'gray.400'} key={i} ml={1} />;
          }
          return <Icon as={BsStar} color={'gray.400'} key={i} ml={1} />;
        })}
      {/* <Box as="span" ml="2" color="gray.600" fontSize="sm">
        {numReviews} review{numReviews > 1 && 's'}
      </Box> */}
    </Box>
  );
}

export const ProductCard: VFC<Props> = ({ product }) => {
  return (
    <Box key={product.id} bg="white" shadow="lg" borderRadius="lg" w="300px">
      <Box w="full" height="200px" borderRadiusTop="lg">
        <Img
          src={product.image_urls[0]}
          borderTopRadius="lg"
          alt={product.name}
          objectFit="cover"
          boxSize="200px"
          margin="auto"
        />
      </Box>
      <Stack p={[2, 5]}>
        <Box d="flex" alignItems="baseline">
          <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="blackAlpha">
            {product.type}
          </Badge>
        </Box>
        <Flex h="36px" alignItems="center">
          <Heading size={'sm'} color="gray.600">
            {product.name}
          </Heading>
        </Flex>
        <Text size="sm" color="gray.500">
          {product.brands?.name}
        </Text>
        <Flex justifyContent="space-between" alignContent="center" flexWrap="nowrap">
          <Rating rating={product.rate ? product.rate : 0} />
          <Text fontSize="xl" color={'gray.800'} whiteSpace="nowrap">
            {product.price.toLocaleString()}円
          </Text>
        </Flex>
      </Stack>
    </Box>
  );
};
