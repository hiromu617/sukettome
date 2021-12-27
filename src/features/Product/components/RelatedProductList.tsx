import { VFC } from 'react';
import { Stack, Flex, Heading, Icon } from '@chakra-ui/react';
import { Product, ProductListItem } from '..';
import { FcList } from 'react-icons/fc';

type Props = {
  products: Product[];
};

export const RelatedProductList: VFC<Props> = ({ products }) => {
  return (
    <Stack w="full" spacing={5} pt={10}>
      <Flex px={1} py={2} alignItems="center" borderBottom="1px solid" borderColor="gray.300">
        <Icon as={FcList} w={7} h={7} mr="2" />
        <Heading size="md" color="gray.600">
          関連商品
        </Heading>
      </Flex>
      {products.map((product) => {
        return <ProductListItem key={product.id} product={product} />;
      })}
    </Stack>
  );
};
