import { VFC } from 'react';
import { HStack, Flex, Icon, Heading, Text, Box, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

type Props = {
  totalCount: number;
  pageSize: number;
  keyword?: string;
  type?: string;
  currentPage: number;
};

const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i);

export const Pagination: VFC<Props> = ({ keyword, type, totalCount, pageSize, currentPage }) => {
  const router = useRouter();
  return (
    <HStack w="full" justifyContent="center" align="center" py={5}>
      {range(1, Math.ceil(totalCount / pageSize)).map((number, index) => (
        <Button
          as="a"
          key={index}
          onClick={() =>
            router.push({
              pathname: '/products',
              query: { keyword: keyword, type: type, page: number },
            })
          }
          bg={currentPage === number ? 'blue.500' : 'blue.100'}
          color={currentPage === number ? 'white' : 'blue.600'}
          _hover={{
            bg: 'blue.300',
            color: 'white',
          }}
          borderRadius="full"
        >
          {number}
        </Button>
      ))}
    </HStack>
  );
};
