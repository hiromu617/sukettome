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
import { useCurrentUser, AvatarUpload, useUpdateUser } from '../';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '../../../components/Form/ErrorMessage';
import { useShowToast } from '../../../hooks/useShowToast';
import { useRouter } from 'next/router';

type UserForm = {
  user_name: string;
  bio: string;
  sex: string;
  skating_history: number;
};

export const UserSettingProfile: VFC = () => {
  const { currentUser } = useCurrentUser();
  const { updateUser } = useUpdateUser();
  const { showToast } = useShowToast();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserForm>();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) router.push('/');
  }, [router, currentUser]);

  const onSubmit: SubmitHandler<UserForm> = (data) => {
    try {
      if (!currentUser) return;
      updateUser(currentUser.id, data);
      showToast('ユーザー情報を更新しました', '', 'success');
    } catch (e) {
      console.error(e);
    }
  };

  if (!currentUser) {
    return <p>loading...</p>;
  }

  return (
    <Box bg="white" px={4} py={6} shadow="lg" borderRadius="lg">
      <Flex pb={4} px={2} alignItems="center">
        <Icon as={FcSettings} w={7} h={7} mr="2" />
        <Heading size="md" color="gray.600">
          プロフィール設定
        </Heading>
      </Flex>
      <Divider />
      <Flex alignItems="base" pt={4}>
        <Stack>
          <AvatarUpload currentUser={currentUser} />
        </Stack>
        <Box h="full" flex="1">
          <Stack spacing="6">
            <Box>
              <Text mb={2}>ユーザー名</Text>
              <Controller
                name="user_name"
                control={control}
                rules={{ required: true, maxLength: 20 }}
                defaultValue={currentUser.user_name}
                render={({ field }) => (
                  <Input
                    mb={3}
                    isRequired
                    placeholder="スケボー大好き太郎"
                    isInvalid={!!errors?.user_name}
                    {...field}
                  />
                )}
              />
              {errors?.user_name?.type === 'required' && (
                <ErrorMessage>ユーザー名は必須です</ErrorMessage>
              )}
              {errors?.user_name?.type === 'maxLength' && (
                <ErrorMessage>20文字以内で入力してください</ErrorMessage>
              )}
            </Box>
            <Box>
              <Text mb={2}>自己紹介</Text>
              <Controller
                name="bio"
                control={control}
                defaultValue={currentUser.bio ? currentUser.bio : ''}
                rules={{ maxLength: 256 }}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    mb={3}
                    isInvalid={!!errors?.bio}
                    placeholder="よろしくお願いします"
                  />
                )}
              />
              {errors?.bio?.type === 'maxLength' && (
                <ErrorMessage>256文字以内で入力してください</ErrorMessage>
              )}
            </Box>
            <Box>
              <Text mb={2}>性別</Text>
              <Controller
                name="sex"
                control={control}
                defaultValue={currentUser.sex ? currentUser.sex : '未設定'}
                render={({ field }) => (
                  <Select {...field}>
                    <option value="未設定">未設定</option>
                    <option value="男性">男性</option>
                    <option value="女性">女性</option>
                  </Select>
                )}
              />
            </Box>
            <Box>
              <Text mb={2}>スケート歴</Text>
              <Controller
                name="skating_history"
                control={control}
                defaultValue={currentUser.skating_history ? currentUser.skating_history : 0}
                render={({ field }) => (
                  <Select {...field}>
                    <option value={0}>未設定</option>
                    <option value={1}>半年以下</option>
                    <option value={2}>半年~1年</option>
                    <option value={3}>1年~2年</option>
                    <option value={4}>2年~3年</option>
                    <option value={5}>3年~4年</option>
                    <option value={6}>5年以上</option>
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
      </Flex>
    </Box>
  );
};
