import type { NextPage, GetServerSideProps } from 'next';
import { Stack, Flex, Icon, Heading, Text, Box } from '@chakra-ui/react';
import { supabase } from '../../../src/libs/supabase-client';
import { Product } from '../../../src/features/Product';
import { ProductListItem } from '../../../src/features/Product';
import { FcSearch } from 'react-icons/fc';
import { ArrowLeftIcon } from '@chakra-ui/icons';
import type { Brand } from '../../../src/features/Brand';
import Link from 'next/link';
import { Pagination } from '../../../src/components/Layout/Pagination';
import { useRouter } from 'next/router';

type Props = {
  Products: Product[];
  page: number;
  totalCount: number;
  brand: Brand;
};

const PAGE_SIZE = 10;

const BrandId: NextPage<Props> = ({ Products, page, totalCount, brand }) => {
  const router = useRouter();
  const onClick = (index: number) => {
    router.push({
      pathname: `/brands/${brand.id}`,
      query: { page: index },
    });
  };
  return (
    <>
      <Stack bg="white" px={4} py={6} shadow="lg" borderRadius="lg">
        <Flex px={2} alignItems="center" justify="space-between">
          <Flex alignItems="center">
            <Icon as={FcSearch} w={7} h={7} mr="2" />
            <Heading size="md" color="gray.600">
              {`${brand.name}の商品`}
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
  const startIndex = (page - 1) * PAGE_SIZE;
  const { data: brand } = await supabase.from('brands').select('*').eq('id', id).single();
  const { data, error, status, count } = await supabase
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
    },
  };
};
