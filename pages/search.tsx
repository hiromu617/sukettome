import type { NextPage, GetServerSideProps } from 'next';
import { supabase } from '../src/libs/supabase-client';
import { Stack, Box, Text } from '@chakra-ui/react';
import { SearchForm } from '../src/features/Search';

const Search: NextPage = () => {
 

  return (
    <Stack bg="white" px={4} py={6} shadow="lg" borderRadius="lg">
      <SearchForm />
      <Box>
        <Text mb={2} fontWeight="bold" fontSize="lg">
          ブランドから探す
        </Text>
        <Text mb={2}>Todo: ブランド画像をリストで載せる</Text>
      </Box>
    </Stack>
  );
};

export default Search;
