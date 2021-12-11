import { VFC } from 'react';
import type { Product } from '../';
import {
  SimpleGrid,
  Box,
  Text,
  Spacer,
  Flex,
  Badge,
  Icon,
  Stack,
  Heading,
  Img,
  Button,
  VStack,
  Divider,
} from '@chakra-ui/react';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { StarIcon } from '@chakra-ui/icons';
import Rating from 'react-rating';

type Props = {
  product: Product;
};

export const ProductDetail: VFC<Props> = ({ product }) => {
  return (
    <VStack bg="white" shadow="lg" borderRadius="lg" w="full" p={5}>
      <SimpleGrid columns={[1, 2]} w="full" spacing={10}>
        <Box>
          <Img
            src={product.image_urls[0]}
            borderTopRadius="lg"
            alt={product.name}
            objectFit="cover"
          />
        </Box>
        <Stack h="100%" py={5} align="stretch">
          <Box d="flex" alignItems="baseline">
            <Badge
              rounded="full"
              px="2"
              fontSize="1em"
              colorScheme="blackAlpha"
              _hover={{ opacity: '0.5' }}
            >
              {product.type}
            </Badge>
          </Box>
          <Heading size={'lg'} color="gray.600">
            {product.name}
          </Heading>
          <Text size="xl" color="gray.500" _hover={{ textDecoration: 'underline' }}>
            {product.brands?.name}
          </Text>
          <Rating
            initialRating={4.5}
            readonly
            emptySymbol={<StarIcon boxSize={7} color="gray.100" />}
            fullSymbol={<StarIcon boxSize={7} color="yellow.300" />}
          />
          <Text textAlign="right" fontSize="2xl" color={'gray.800'} whiteSpace="nowrap">
            {product.price.toLocaleString()}円
          </Text>
          <Spacer />
          <Flex justify="space-between" align="center">
            <Button
              as="a"
              colorScheme="red"
              href={product.product_link}
              target="_blank"
              rel="noopener noreferrer"
              size="md"
            >
              商品リンク(楽天)
            </Button>
            <Button
              size="md"
              // leftIcon={<Icon as={FcLike} w={6} h={6} />}
              leftIcon={<Icon as={FcLikePlaceholder} w={6} h={6} />}
            >
              調子イイ(100)
            </Button>
          </Flex>
        </Stack>
      </SimpleGrid>
      <Divider />
      <Box p={5} w="full">
        <Heading size={'md'} color="gray.600">
          商品詳細
        </Heading>
        <Text py={5} color="gray.700">
          {product.detail}
        </Text>
      </Box>
    </VStack>
  );
};
