import type { NextPage, GetStaticProps } from 'next';
import { supabase } from '../src/libs/supabase-client';
import { Stack, HStack, Box, Text, Img } from '@chakra-ui/react';
import type { Brand } from '../src/features/Brand';
import { SearchForm } from '../src/features/Search';
import Link from 'next/link';

type Props = {
  brands: Brand[];
};

const Search: NextPage<Props> = ({ brands }) => {
  return (
    <Stack bg="white" px={4} py={6} shadow="lg" borderRadius="lg">
      <SearchForm />
      <Box>
        <Text mb={2} fontWeight="bold" fontSize="lg">
          ブランドから探す
        </Text>
        <HStack wrap="wrap" py={2}>
          {brands.map((brand) => {
            return (
              <Link key={brand.id} href={`/brands/${brand.id}`} passHref>
                <Box
                  w="120px"
                  borderRadius="lg"
                  border="1px"
                  borderColor="gray.200"
                  textAlign="center"
                  cursor="pointer"
                  p={2}
                  _hover={{ bg: 'gray.100' }}
                >
                  <Box w="full" height="80px">
                    <Img
                      src={brand.official_url!}
                      borderTopRadius="lg"
                      alt={brand.name}
                      objectFit="cover"
                      boxSize="80px"
                      margin="auto"
                    />
                  </Box>
                  <Text fontWeight="bold">{brand.name}</Text>
                </Box>
              </Link>
            );
          })}
        </HStack>
      </Box>
    </Stack>
  );
};

export default Search;

export const getStaticProps: GetStaticProps = async () => {
  const { data, error, status } = await supabase.from('brands').select('*');
  if (error && status !== 406) {
    throw error;
  }
  return {
    props: {
      brands: data,
    },
  };
};
