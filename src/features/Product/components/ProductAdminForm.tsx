import { VFC } from 'react';
import type { Product } from '../';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useUpdateProduct } from '../';
import { useSWRConfig } from 'swr'
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Button,
  Input,
  Textarea,
  Select,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { useShowToast } from '../../../hooks/useShowToast';

type ProductForm = {
  name: string;
  product_link: string;
  detail: string;
  type: string;
  price: number;
  brand_id: number;
};

type Props = {
  product?: Product;
};

export const ProductAdminForm: VFC<Props> = ({ product }) => {
  const { updateProduct } = useUpdateProduct();
  const { mutate } = useSWRConfig()
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductForm>({
    mode: 'onChange',
    defaultValues: {
      name: product?.name,
      product_link: product?.product_link,
      detail: product?.detail,
      type: product?.type,
      price: product?.price,
      brand_id: product?.brand_id,
    },
  });
  const { showToast } = useShowToast();

  const onSubmit: SubmitHandler<ProductForm> = async (data) => {
    try {
      console.log(data);
      if (!product) return;
      await updateProduct(product?.id, {
        name: data.name,
        product_link: data.product_link,
        detail: data.detail,
        type: data.type,
        price: data.price,
        brand_id: data.brand_id,
      });
      showToast('商品を更新しました', '', 'success');
      mutate([`products`, product.id])
    } catch (e) {
      showToast(String(e), '', 'error');
    }
  };

  return (
    <Box bg="white" px={4} py={6} shadow="lg" borderRadius="lg" w="full">
      <Flex pb={4} px={2} alignItems="center">
        <Heading size="md" color="gray.600">
          products update
        </Heading>
      </Flex>
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
                <option value="2">Independent</option>
                <option value="3">Thunder</option>
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
  );
};
