import type { NextPage, GetServerSideProps } from 'next';
import { Stack, Flex, Icon, Heading, Text, Box, Button } from '@chakra-ui/react';
import { supabase } from '../../src/libs/supabase-client';
import { Product } from '../../src/features/Product';
import { ProductListItem } from '../../src/features/Product';
import { FcSearch } from 'react-icons/fc';
import { ArrowLeftIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { Pagination } from '../../src/components/Layout/Pagination';

type Props = {
  Products: Product[];
  keyword?: string;
  type?: string;
  page: number;
  totalCount: number;
};

const PAGE_SIZE = 10;

const ProductIndex: NextPage<Props> = ({ Products, keyword, type, page, totalCount }) => {
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
          <Text fontWeight="bold" color="gray.700" fontSize="lg">
            検索条件に一致する商品はありませんでした。
          </Text>
        </Box>
      )}
      <Pagination
        totalCount={totalCount}
        pageSize={PAGE_SIZE}
        keyword={keyword}
        type={type}
        currentPage={page}
      />
    </>
  );
};

export default ProductIndex;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const keyword = context.query.keyword;
  const type = context.query.type;
  const page = context.query.page ? +context.query.page : 1;
  let query = supabase.from('products').select(
    `
      *,
    brands (
      *
    )
    `,
    { count: 'exact' }
  );
  if (keyword) {
    query = query.like('name', `%${keyword}%`);
  }
  if (type) {
    query = query.eq('type', `${type}`);
  }
  const startIndex = (page - 1) * PAGE_SIZE;
  query = query.range(startIndex, startIndex + (PAGE_SIZE - 1));
  const { data, error, status, count } = await query;
  const totalCount = count ? count : 0;

  if (error && status !== 406) {
    throw error;
  }

  return {
    props: {
      Products: data,
      keyword: keyword,
      type: type,
      page: page,
      totalCount: totalCount,
    },
  };
};
