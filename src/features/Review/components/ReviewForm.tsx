import { VFC, useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Divider,
  Heading,
  Text,
  Button,
  Textarea,
  Icon,
  VStack,
  Stack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Tag,
} from '@chakra-ui/react';
import { useCurrentUser } from '../../../../src/features/User';
import { useLoginModal } from '../../../../src/features/Auth';
import { useShowToast } from '../../../../src/hooks/useShowToast';
import { useRouter } from 'next/router';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '../../../../src/components/Form/ErrorMessage';
import { FcViewDetails } from 'react-icons/fc';
import Rating from 'react-rating';
import { StarIcon } from '@chakra-ui/icons';
import { useInsertReview } from '../../../../src/features/Review';

type ReviewForm = {
  body: string;
};

type ReviewFormProps = {
  productId: number;
};

export const ReviewForm: VFC<ReviewFormProps> = ({ productId }) => {
  const { currentUser } = useCurrentUser();
  const [rating, setRating] = useState<number>(3);
  const { isOpen, onOpen } = useLoginModal();
  const { showToast } = useShowToast();
  const router = useRouter();
  const { insertReview } = useInsertReview();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ReviewForm>();

  console.log(router.query.id);
  useEffect(() => {
    if (!currentUser) {
      onOpen();
      showToast('ログインしてください', '', 'warning');
    }
  }, [currentUser]);

  const onSubmit: SubmitHandler<ReviewForm> = (data) => {
    try {
      console.log(data);
      if (!currentUser) {
        showToast('ログインしてください', '', 'warning');
        return;
      }
      insertReview(data.body, rating, productId, currentUser.id);
      showToast('レビューを投稿しました', '', 'success');
      router.push(`/products/${productId}`);
    } catch (e) {
      console.error(e);
      showToast(String(e), '', 'error');
    }
  };

  return (
    <VStack w="full">
      {!currentUser && !isOpen && (
        <>
          <Alert status="warning">
            <AlertIcon />
            <Stack>
              <AlertTitle>レビューにはログインが必要です</AlertTitle>
              <AlertDescription>画面右上のボタンからログインしてください</AlertDescription>
            </Stack>
          </Alert>
        </>
      )}
      <Box bg="white" px={4} py={6} shadow="lg" borderRadius="lg" w="full">
        <Flex pb={4} px={2} alignItems="center">
          <Icon as={FcViewDetails} w={7} h={7} mr="2" />
          <Heading size="md" color="gray.600">
            レビュー投稿
          </Heading>
        </Flex>
        <Divider />
        <Stack pt={5}>
          <Box mb={5}>
            <Text mb={2}>おすすめ度</Text>
            <Flex alignItems="center">
              <Rating
                initialRating={rating}
                onChange={(v) => setRating(v)}
                fractions={1}
                emptySymbol={<StarIcon boxSize={10} color="gray.100" />}
                fullSymbol={<StarIcon boxSize={10} color="yellow.300" />}
              />
              <Box ml={5}>
                {rating === 1 && <Tag size="lg">イマイチ</Tag>}
                {rating === 2 && <Tag size="lg">ピンとこない</Tag>}
                {rating === 3 && <Tag size="lg">普通、まあまあ</Tag>}
                {rating === 4 && <Tag size="lg">イイ感じ！</Tag>}
                {rating === 5 && <Tag size="lg">最高！</Tag>}
              </Box>
            </Flex>
          </Box>
          <Box mb={5}>
            <Text mb={2}>レビュー本文</Text>
            <Controller
              name="body"
              control={control}
              rules={{ required: true, maxLength: 256 }}
              render={({ field }) => (
                <Textarea
                  {...field}
                  mb={3}
                  isInvalid={!!errors?.body}
                  placeholder="トリックに高さが出しやすいのでHiを愛用しています。安定感があります。"
                  h="300px"
                />
              )}
            />
            {errors?.body?.type === 'maxLength' && (
              <ErrorMessage>256文字以内で入力してください</ErrorMessage>
            )}
            {errors?.body?.type === 'required' && (
              <ErrorMessage>レビュー本文は必須です</ErrorMessage>
            )}
          </Box>
          <Button
            onClick={handleSubmit(onSubmit)}
            color="white"
            bg="gray.900"
            _hover={{ bg: 'gray.500' }}
            isLoading={isSubmitting}
            loadingText="投稿中..."
          >
            投稿する
          </Button>
        </Stack>
      </Box>
    </VStack>
  );
};
