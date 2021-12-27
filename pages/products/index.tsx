import type { NextPage, GetServerSideProps } from 'next';
import { Stack, Flex, Icon, Heading, Text, Box, Button } from '@chakra-ui/react';
import { supabase } from '../../src/libs/supabase-client';
import { Product } from '../../src/features/Product';
import { ProductListItem } from '../../src/features/Product';
import { FcSearch } from 'react-icons/fc';
import { ArrowLeftIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { Pagination } from '../../src/components/Layout/Pagination';
import { BreadcrumbNav } from '../../src/components/Layout/BreadcrumbNav';
import { SortMenu } from '../../src/components/Layout/SortMenu';
import { useRouter } from 'next/router';

type Props = {
  Products: Product[];
  keyword?: string;
  type?: string;
  page: number;
  totalCount: number;
  sort: string;
};

const PAGE_SIZE = 10;

const ProductIndex: NextPage<Props> = ({ Products, keyword, type, page, totalCount, sort }) => {
  const router = useRouter();
  const onClick = (index: number) => {
    router.push({
      pathname: '/products',
      query: { keyword: keyword, type: type, page: index },
    });
  };

  const onSortChange = (value: string) => {
    router.push({
      pathname: '/products',
      query: { keyword: keyword, type: type, sort: value },
    });
  };
  return (
    <>
      <BreadcrumbNav
        lists={[
          { name: 'HOME', href: '/' },
          { name: `${keyword ? `「${keyword}」` : '全て'}の${type ? type : '商品'}`, href: `#` },
        ]}
      />
      <Stack bg="white" px={4} py={6} shadow="lg" borderRadius="lg">
        <Flex px={2} alignItems="center" justify="space-between">
          <Flex alignItems="center">
            <Icon as={FcSearch} w={7} h={7} mr="2" />
            <Heading size="md" color="gray.600">
              {`${keyword ? `「${keyword}」` : '全て'}の${type ? type : '商品'}`}
            </Heading>
          </Flex>
          <Text color="gray.600">{`全${totalCount}件`}</Text>
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
      <Flex justify="end">
        <SortMenu onPush={onSortChange} currentSortType={sort} />
      </Flex>
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
        currentPage={page}
        onClick={onClick}
      />
    </>
  );
};

export default ProductIndex;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const keyword = context.query.keyword;
  const type = context.query.type;
  const page = context.query.page ? +context.query.page : 1;
  const sort = context.query.sort ? context.query.sort : 'new';

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
  if (sort === 'new') {
    query = query.order('created_at', { ascending: false });
  } else if (sort === 'rate') {
    query = query.order('rate', { ascending: false });
  } else if (sort === 'higher') {
    query = query.order('price', { ascending: false });
  } else if (sort === 'lower') {
    query = query.order('price', { ascending: true });
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
      sort: sort,
    },
  };
};
