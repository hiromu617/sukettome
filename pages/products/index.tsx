import type { NextPage, GetServerSideProps } from 'next';
import { Stack, Flex, Icon, Heading, Text, Box } from '@chakra-ui/react';
import { supabase } from '../../src/libs/supabase-client';
import type { Product } from '../../src/features/Product';
import { ProductCard } from '../../src/features/Product';
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
        <Flex px={2} alignItems="center">
          <Icon as={FcSearch} w={7} h={7} mr="2" />
          <Heading size="md" color="gray.600">
            {`${keyword ? `「${keyword}」` : '全て'}の${type ? type : '商品'}`}
          </Heading>
          <Text ml={4} color="gray.600">{`全${Products.length}件`}</Text>
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
      <Flex mt={10} flexWrap="wrap" w="full" justify="space-between">
        {Products.map((Product) => {
          return <ProductCard key={Product.id} product={Product} />;
        })}
      </Flex>
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
