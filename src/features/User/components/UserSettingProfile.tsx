import { VFC } from 'react';
import type { User } from '../index';
import {
  Box,
  Flex,
  Avatar,
  Stack,
  Center,
  Heading,
  Text,
  Button,
  Input,
  Textarea,
  Select,
} from '@chakra-ui/react';
import { useCurrentUser } from '../';
import Link from 'next/link';

export const UserSettingProfile: VFC = () => {
  const { currentUser } = useCurrentUser();

  if (!currentUser) {
    return <div>error</div>;
  }

  return (
    <Box bg="white" px={4} py={6} shadow="lg" borderRadius="lg">
      <Box pb={6} px={2}>
        <Heading size="md" color="gray.700">
          プロフィール設定
        </Heading>
      </Box>
      <Flex alignItems="base">
        <Stack>
          <Avatar name={currentUser.user_name} src={currentUser.avatar_url} size="xl" />
          <Button size="sm">変更</Button>
        </Stack>
        <Box h="full" flex="1" px={6}>
          <Stack spacing="6">
            <Box>
              <Text mb={2}>ユーザー名</Text>
              <Input value={currentUser.user_name} placeholder="スケボー大好き太郎" />
            </Box>
            <Box>
              <Text mb={2}>自己紹介</Text>
              <Textarea value={currentUser.bio} placeholder="よろしくお願いします" />
            </Box>
            <Box>
              <Text mb={2}>性別</Text>
              <Select placeholder="Select option">
                <option value="option1">男性</option>
                <option value="option2">女性</option>
                <option value="option3">未設定</option>
              </Select>
            </Box>
            <Box>
              <Text mb={2}>スケート歴</Text>
              <Select placeholder="Select option">
                <option value="option2">半年未満</option>
                <option value="option3">1年</option>
                <option value="option3">2年</option>
                <option value="option3">3年</option>
                <option value="option3">4年</option>
                <option value="option3">5年</option>
                <option value="option3">5年以上</option>
                <option value="option3">10年以上</option>
              </Select>
            </Box>
            <Button color="white" bg="gray.900" _hover={{ bg: 'gray.500' }}>
              保存
            </Button>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};
