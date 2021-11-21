import { VFC, useEffect } from 'react';
import { FcSettings } from 'react-icons/fc';
import {
  Box,
  Flex,
  Avatar,
  Stack,
  Divider,
  Heading,
  Text,
  Button,
  Input,
  Textarea,
  Select,
  Icon,
} from '@chakra-ui/react';
import { useCurrentUser, AvatarUpload, useUpdateUser } from '../../User';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '../../../components/Form/ErrorMessage';
import { useShowToast } from '../../../hooks/useShowToast';
import { useRouter } from 'next/router';

type ProductForm = {
  name: string;
  product_link: string;
  detail: string;
  type: string;
};

export const AdminHome: VFC = () => {
  const { currentUser } = useCurrentUser();
  const { showToast } = useShowToast();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductForm>();
  const router = useRouter();

  useEffect(() => {
    if (currentUser?.id !== process.env.NEXT_PUBLIC_ADMIN_USER_ID) router.push('/');
  }, [router, currentUser]);

  const onSubmit: SubmitHandler<ProductForm> = (data) => {
    try {
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Box bg="white" px={4} py={6} shadow="lg" borderRadius="lg">
      <Flex pb={4} px={2} alignItems="center">
        <Icon as={FcSettings} w={7} h={7} mr="2" />
        <Heading size="md" color="gray.600">
          Admin
        </Heading>
      </Flex>
      <Divider />
      <Box h="full" flex="1">
        <Stack spacing="6" pt={6}>
          <Box>
            <Text mb={2}>商品名</Text>
            <Controller
              name="name"
              control={control}
              rules={{ required: true, maxLength: 20 }}
              render={({ field }) => (
                <Input
                  mb={3}
                  isRequired
                  placeholder="スケボー大好き太郎"
                  isInvalid={!!errors?.name}
                  {...field}
                />
              )}
            />
          </Box>
          <Box>
            <Text mb={2}>商品リンク</Text>
            <Controller
              name="product_link"
              control={control}
              rules={{ required: true, maxLength: 20 }}
              render={({ field }) => (
                <Input
                  mb={3}
                  isRequired
                  placeholder="スケボー大好き太郎"
                  isInvalid={!!errors?.product_link}
                  {...field}
                />
              )}
            />

          </Box>
          <Box>
            <Text mb={2}>商品詳細</Text>
            <Controller
              name="detail"
              control={control}
              rules={{ maxLength: 256 }}
              render={({ field }) => (
                <Textarea
                  {...field}
                  mb={3}
                  isInvalid={!!errors?.detail}
                  placeholder="よろしくお願いします"
                />
              )}
            />
          </Box>
          <Box>
            <Text mb={2}>種類</Text>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select {...field}>
                  <option value="デッキ">デッキ</option>
                  <option value="トラック">トラック</option>
                  <option value="ウィール">ウィール</option>
                  <option value="ベアリング">ベアリング</option>
                  <option value="デッキテープ">デッキテープ</option>
                </Select>
              )}
            />
          </Box>
          <Button
            onClick={handleSubmit(onSubmit)}
            color="white"
            bg="gray.900"
            _hover={{ bg: 'gray.500' }}
            isLoading={isSubmitting}
            loadingText="保存中..."
          >
            保存
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
