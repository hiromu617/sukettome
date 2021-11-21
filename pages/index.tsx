import type { NextPage, GetServerSideProps } from 'next';
import { supabase } from '../src/libs/supabase-client';
import type { Product } from '../src/features/Product';
import {
  Box,
  Text,
  Flex,
  Avatar,
  IconButton,
  Spacer,
  useDisclosure,
  SkeletonCircle,
  Badge,
  Icon,
  Stack,
  Heading,
  HStack,
  Img,
} from '@chakra-ui/react';
import Link from 'next/link';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';

type Props = {
  Products: Product[];
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

const Home: NextPage<Props> = ({ Products }) => {
  return (
    <HStack spacing={[4, 8]} overflowX="auto">
      {Products.map((product) => {
        return (
          <Box key={product.id} bg="white" shadow="lg" borderRadius="lg" w="300px">
            <Box w="full" height="200px" borderRadiusTop="lg">
              <Img src={product.image_urls[0]} fit="cover" borderTopRadius="lg"/>
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
                <Rating rating={4.2} />
                <Text fontSize="xl" color={'gray.800'} whiteSpace="nowrap">
                  {product.price}円
                </Text>
              </Flex>
            </Stack>
          </Box>
        );
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
  console.log('data', data);
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
