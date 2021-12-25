import { VFC } from 'react';
import type { Product } from '../';
import { Box, Text, Flex, Badge, Heading, Img } from '@chakra-ui/react';
import Link from 'next/link';
import { StarIcon } from '@chakra-ui/icons';
import Rating from 'react-rating';

type Props = {
  product: Product;
};

export const ProductListItem: VFC<Props> = ({ product }) => {
  return (
    <Link href={`products/${product.id}`} passHref>
      <Flex
        bg="white"
        shadow="lg"
        borderRadius="lg"
        w="full"
        cursor="pointer"
        _hover={{ shadow: 'xl' }}
      >
        <Box p={2} height="full" borderRadiusTop="lg">
          <Img
            src={product.image_urls[0]}
            borderTopRadius="lg"
            alt={product.name}
            objectFit="cover"
            boxSize="150px"
            margin="auto"
          />
        </Box>
        <Flex p={[2, 5]} flex={1} flexDirection="column" justify="space-between">
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
          <Flex alignItems="center">
            <Heading fontSize='lg' color="gray.600">
              {product.name}
            </Heading>
          </Flex>
          <Text fontSize="md" color="gray.500" _hover={{ textDecoration: 'underline' }}>
            {product.brands?.name}
          </Text>
          <Flex justifyContent="space-between" alignContent="center" flexWrap="nowrap">
            <Rating
              initialRating={product.rate}
              readonly
              emptySymbol={<StarIcon boxSize={6} color="gray.100" />}
              fullSymbol={<StarIcon boxSize={6} color="yellow.300" />}
            />
            <Text fontSize="xl" color={'gray.800'} whiteSpace="nowrap">
              {product.price.toLocaleString()}円
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};
