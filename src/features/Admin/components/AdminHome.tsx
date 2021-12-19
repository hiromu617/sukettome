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
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { useCurrentUser, AvatarUpload, useUpdateUser } from '../../User';
import { useForm, Controller, SubmitHandler, useFieldArray } from 'react-hook-form';
import { ErrorMessage } from '../../../components/Form/ErrorMessage';
import { useShowToast } from '../../../hooks/useShowToast';
import { useRouter } from 'next/router';
import { useInsertProduct } from '../../Product';

type ProductForm = {
  name: string;
  product_link: string;
  detail: string;
  type: string;
  price: number;
  image_urls: { url: string }[];
  brand_id: number;
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
  const { insertProduct } = useInsertProduct();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'image_urls',
  });

  useEffect(() => {
    if (currentUser?.id !== process.env.NEXT_PUBLIC_ADMIN_USER_ID) router.push('/');
  }, [router, currentUser]);

  const onSubmit: SubmitHandler<ProductForm> = (data) => {
    try {
      // console.log(data);
      insertProduct(
        data.name,
        data.product_link,
        data.detail,
        data.type,
        data.price,
        data.image_urls.map((val) => val.url),
        data.brand_id,
      );
      showToast('商品を登録しました', '', 'success')
    } catch (e) {
      showToast(String(e), '', 'error')
    }
  };

  return (
    <Box bg="white" px={4} py={6} shadow="lg" borderRadius="lg">
      <Flex pb={4} px={2} alignItems="center">
        <Icon as={FcSettings} w={7} h={7} mr="2" />
        <Heading size="md" color="gray.600">
          Admin/products
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
              rules={{ required: true }}
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
              rules={{ required: true }}
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
                  rules={{ required: true }}
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
          {/* tod: 動的に取得 */}
          <Box>
            <Text mb={2}>ブランド</Text>
            <Controller
              name="brand_id"
              control={control}
              render={({ field }) => (
                <Select {...field}>
                  <option value="1">venture</option>
                  <option value="2">bones</option>
                  <option value="3">spit fire</option>
                </Select>
              )}
            />
          </Box>
          <Box>
            <Text mb={2}>参考価格</Text>
            <Controller
              name="price"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <NumberInput mb={3} isRequired isInvalid={!!errors?.product_link} {...field}>
                  <NumberInputField />
                </NumberInput>
              )}
            />
          </Box>
          <Box>
            <Text mb={2}>画像URL</Text>
            {fields.map((field, index) => {
              return (
                <Flex key={index}>
                  <Controller
                    name={`image_urls.${index}.url`}
                    control={control}
                    render={({ field }) => <Input mb={3} isRequired placeholder="url" {...field} />}
                  />
                  <Button colorScheme="red" onClick={() => remove(index)}>
                    削除
                  </Button>
                </Flex>
              );
            })}
            <Button onClick={() => append({ url: '' })}>追加</Button>
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
