import type { NextPage, GetServerSideProps } from 'next';
import { supabase } from '../src/libs/supabase-client';
import type { Product } from '../src/features/Product';
import {
  Box,
  Icon,
  HStack,
} from '@chakra-ui/react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { ProductCard } from '../src/features/Product';

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
      {Products.map((product, i) => {
        return <ProductCard key={product.id} product={product}/>;
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
