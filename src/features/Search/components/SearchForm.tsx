import { VFC } from 'react';
import {
  Stack,
  Input,
  Box,
  Text,
  Select,
  Button,
  Flex,
  Icon,
  Heading,
  Divider,
} from '@chakra-ui/react';
import { FcSearch } from 'react-icons/fc';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';

type SearchForm = {
  keyword: string;
  type: string;
};

export const SearchForm: VFC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SearchForm>();
  const router = useRouter();

  const onSubmit: SubmitHandler<SearchForm> = (data) => {
    try {
      router.push({
        pathname: '/products',
        query: { keyword: data.keyword, type: data.type },
      });
    } catch (e) {}
  };

  return (
    <>
      <Flex px={2} alignItems="center">
        <Icon as={FcSearch} w={7} h={7} mr="2" />
        <Heading size="md" color="gray.600">
          検索
        </Heading>
      </Flex>
      <Divider />
      <Box py="5">
        <Controller
          name="keyword"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="キーワードを入力"
              variant="filled"
              size="lg"
              borderRadius="full"
            />
          )}
        />
      </Box>
      <Box pb="5">
        <Text mb={2}>種類</Text>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Select {...field}>
              <option value="未選択">未選択</option>
              <option value="デッキ">デッキ</option>
              <option value="トラック">トラック</option>
              <option value="ウィール">ウィール</option>
              <option value="ベアリング">ベアリング</option>
              <option value="デッキテープ">デッキテープ</option>
            </Select>
          )}
        />
      </Box>
      <Box pb="10">
        <Button
          onClick={handleSubmit(onSubmit)}
          isFullWidth
          color="white"
          bg="gray.900"
          _hover={{ bg: 'gray.500' }}
        >
          検索
        </Button>
      </Box>
    </>
  );
};
