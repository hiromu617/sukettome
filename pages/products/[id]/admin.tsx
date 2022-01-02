import type { NextPage } from 'next';
import { ProductAdmin } from '../../../src/features/Product';
import { VStack } from '@chakra-ui/react';

const ProductIdAdmin: NextPage = () => {
  return (
    <VStack>
      <ProductAdmin />
    </VStack>
  );
};

export default ProductIdAdmin;
