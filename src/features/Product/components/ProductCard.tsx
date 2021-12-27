import { VFC } from 'react';
import type { Product } from '../';
import { Box, Text, Flex, Badge, Icon, Stack, Heading, Img } from '@chakra-ui/react';
import Link from 'next/link';
import { StarIcon } from '@chakra-ui/icons';
import Rating from 'react-rating';

type Props = {
  product: Product;
};

export const ProductCard: VFC<Props> = ({ product }) => {
  return (
    <Link href={`products/${product.id}`} passHref>
      <Box
        bg="white"
        shadow="lg"
        borderRadius="lg"
        w="300px"
        cursor="pointer"
        _hover={{ shadow: 'xl' }}
      >
        <Box w="full" height="200px">
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
            <Badge
              rounded="full"
              px="2"
              fontSize="0.8em"
              colorScheme="blackAlpha"
              _hover={{ opacity: '0.5' }}
            >
              {product.type}
            </Badge>
          </Box>
          <Flex h="36px" alignItems="center">
            <Heading size={'sm'} color="gray.600">
              {product.name}
            </Heading>
          </Flex>
          <Text size="sm" color="gray.500" _hover={{ textDecoration: 'underline' }}>
            {product.brands?.name}
          </Text>
          <Flex justifyContent="space-between" alignContent="center" flexWrap="nowrap">
            <Rating
              initialRating={product.rate}
              readonly
              emptySymbol={<StarIcon boxSize={4} color="gray.100" />}
              fullSymbol={<StarIcon boxSize={4} color="yellow.300" />}
            />
            <Text fontSize="xl" color={'gray.800'} whiteSpace="nowrap">
              {product.price.toLocaleString()}円
            </Text>
          </Flex>
        </Stack>
      </Box>
    </Link>
  );
};
