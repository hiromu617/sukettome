import type { NextPage, GetServerSideProps } from 'next';
import { Stack, Flex, Img, Heading, Text, Box } from '@chakra-ui/react';
import { supabase } from '../../../src/libs/supabase-client';
import { Product } from '../../../src/features/Product';
import { ProductListItem } from '../../../src/features/Product';
import { ArrowLeftIcon } from '@chakra-ui/icons';
import type { Brand } from '../../../src/features/Brand';
import Link from 'next/link';
import { Pagination } from '../../../src/components/Layout/Pagination';
import { useRouter } from 'next/router';
import { BreadcrumbNav } from '../../../src/components/Layout/BreadcrumbNav';
import { SortMenu } from '../../../src/components/Layout/SortMenu';

type Props = {
  Products: Product[];
  page: number;
  totalCount: number;
  brand: Brand;
  sort: string;
};

const PAGE_SIZE = 10;

const BrandId: NextPage<Props> = ({ Products, page, totalCount, brand, sort }) => {
  const router = useRouter();
  const onClick = (index: number) => {
    router.push({
      pathname: `/brands/${brand.id}`,
      query: { page: index },
    });
  };
  const onSortChange = (value: string) => {
    router.push({
      pathname: `/brands/${brand.id}`,
      query: { sort: value },
    });
  };
  return (
    <>
      <BreadcrumbNav
        lists={[
          { name: 'HOME', href: '/' },
          { name: `${brand.name}`, href: `/brands/${brand.id}` },
        ]}
      />
      <Stack bg="white" px={4} py={6} shadow="lg" borderRadius="lg">
        <Flex px={2} alignItems="center" justify="space-between">
          <Flex alignItems="center">
            <Box w="80px" height="80px">
              <Img
                src={`/brands/${brand.name}.png`}
                borderTopRadius="lg"
                alt={brand.name}
                objectFit="cover"
                boxSize="70px"
                margin="auto"
              />
            </Box>
            <Heading size="lg" color="gray.600" ml={2}>
              {brand.name}
            </Heading>
          </Flex>
          <Text color="gray.600">{`全${totalCount}件`}</Text>
        </Flex>
        <Box p={4}>
          <Text fontSize="md" color="gray.600">{brand.description}</Text>
        </Box>
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

export default BrandId;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id as string;
  const page = context.query.page ? +context.query.page : 1;
  const sort = context.query.sort ? context.query.sort : 'new';

  const startIndex = (page - 1) * PAGE_SIZE;
  const { data: brand } = await supabase.from('brands').select('*').eq('id', id).single();
  let query = supabase
    .from('products')
    .select(
      `
      *,
    brands (
      *
    )
    `,
      { count: 'exact' }
    )
    .eq('brand_id', id)
    .range(startIndex, startIndex + (PAGE_SIZE - 1));
  if (sort === 'new') {
    query = query.order('created_at', { ascending: false });
  } else if (sort === 'rate') {
    query = query.order('rate', { ascending: false });
  } else if (sort === 'higher') {
    query = query.order('price', { ascending: false });
  } else if (sort === 'lower') {
    query = query.order('price', { ascending: true });
  }
  const { data, error, status, count } = await query;
  const totalCount = count ? count : 0;

  if (error && status !== 406) {
    throw error;
  }

  return {
    props: {
      Products: data,
      brand: brand,
      page: page,
      totalCount: totalCount,
      sort: sort,
    },
  };
};
