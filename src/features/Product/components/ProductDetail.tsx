import { VFC } from 'react';
import type { Product } from '../';
import {
  SimpleGrid,
  Box,
  Text,
  Spacer,
  Badge,
  Center,
  Stack,
  Heading,
  Img,
  Button,
  VStack,
  Divider,
  HStack,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import Rating from 'react-rating';
import { LikeButton } from '../../Like';
import { BreadcrumbNav } from '../../../components/Layout/BreadcrumbNav';
import Link from 'next/link';
import { useCurrentUser } from '../../User';

type Props = {
  product: Product;
};

export const ProductDetail: VFC<Props> = ({ product }) => {
  const { currentUser } = useCurrentUser();
  return (
    <Stack pb={10}>
      <BreadcrumbNav
        lists={[
          { name: 'HOME', href: '/' },
          { name: `${product.brands?.name}`, href: `/brands/${product.brands?.id}` },
          { name: `${product.name}`, isCurrentPage: true },
        ]}
      />
      {currentUser?.id === process.env.NEXT_PUBLIC_ADMIN_USER_ID && (
        <Link href={`/products/${product.id}/admin`} passHref>
          <Button>Admin</Button>
        </Link>
      )}
      <VStack bg="white" shadow="lg" borderRadius="lg" w="full" p={5}>
        <SimpleGrid columns={[1, 1, 2]} w="full" spacing={10}>
          <Center>
            <Img
              src={product.image_urls[0]}
              borderTopRadius="lg"
              alt={product.name}
              objectFit="cover"
              m="auto"
            />
          </Center>
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
              initialRating={product.rate}
              readonly
              emptySymbol={<StarIcon boxSize={7} color="gray.100" />}
              fullSymbol={<StarIcon boxSize={7} color="yellow.300" />}
            />
            <Text textAlign="right" fontSize="2xl" color={'gray.800'} whiteSpace="nowrap">
              {product.price.toLocaleString()}円
            </Text>
            <Spacer />
            <HStack m="auto">
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
              <LikeButton productId={product.id} />
            </HStack>
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
    </Stack>
  );
};
