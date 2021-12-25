import type { NextPage, GetServerSideProps } from 'next';
import { Stack, Flex, Icon, Heading, Text, Box } from '@chakra-ui/react';
import { supabase } from '../../src/libs/supabase-client';
import { Product } from '../../src/features/Product';
import { ProductListItem } from '../../src/features/Product';
import { FcSearch } from 'react-icons/fc';
import { ArrowLeftIcon } from '@chakra-ui/icons';
import Link from 'next/link';

type Props = {
  Products: Product[];
  keyword?: string;
  type?: string;
};

const ProductIndex: NextPage<Props> = ({ Products, keyword, type }) => {
  return (
    <>
      <Stack bg="white" px={4} py={6} shadow="lg" borderRadius="lg">
        <Flex px={2} alignItems="center" justify="space-between">
          <Flex alignItems="center">
            <Icon as={FcSearch} w={7} h={7} mr="2" />
            <Heading size="md" color="gray.600">
              {`${keyword ? `「${keyword}」` : '全て'}の${type ? type : '商品'}`}
            </Heading>
          </Flex>
          <Text color="gray.600">{`全${Products.length}件`}</Text>
        </Flex>
      </Stack>
      <Box mt={5}>
        <Link href="/search" passHref>
          <Flex alignItems="center" color="blue.600" cursor="pointer">
            <ArrowLeftIcon w={3} h={3} />
            <Text ml={1}>検索画面に戻る</Text>
          </Flex>
        </Link>
      </Box>
      <Stack mt={5} w="full" spacing={4}>
        {Products.map((Product) => {
          return <ProductListItem key={Product.id} product={Product} />;
        })}
      </Stack>
      {Products.length <= 0 && (
        <Box>
          <Text fontWeight="bold" color="gray.700" fontSize="lg">検索条件に一致する商品はありませんでした。</Text>
        </Box>
      )}
    </>
  );
};

export default ProductIndex;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const keyword = context.query.keyword;
  const type = context.query.type;
  let query = supabase.from('products').select(
    `
      *,
    brands (
      *
    )
    `
  );
  if (keyword) {
    query = query.like('name', `%${keyword}%`);
  }
  if (type) {
    query = query.eq('type', `${type}`);
  }
  const { data, error, status } = await query;

  if (error && status !== 406) {
    throw error;
  }

  return {
    props: {
      Products: data,
      keyword: keyword,
      type: type,
    },
  };
};
