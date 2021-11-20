import { VFC } from 'react';
import type { User } from '../index';
import { Box, Flex, Avatar, HStack, Center, Heading, Text, Button } from '@chakra-ui/react';
import { useCurrentUser } from '../';
import Link from 'next/link';
import { SkatingHistoryConst } from '..';

type UserInfoProps = {
  User: User;
};

export const UserInfo: VFC<UserInfoProps> = ({ User }) => {
  const { currentUser } = useCurrentUser();
  return (
    <Flex alignItems="base" bg="white" px={4} py={6} shadow="lg" borderRadius="lg">
      <Center>
        <Avatar name={User.user_name} src={User.avatar_url} size="xl" />
      </Center>
      <Box h="full" flex="1" px={6}>
        <Flex alignItems="center" justify="space-between" height="30px">
          <Heading color="gray.600" size="md">
            {User.user_name}
          </Heading>
          {currentUser?.id === User.id && (
            <Link href="/settings/profile" passHref>
              <Button color="white" bg="gray.900" _hover={{ bg: 'gray.500' }} size="sm">
                編集
              </Button>
            </Link>
          )}
        </Flex>
        <Box py={4}>
          <Text color="gray.600">{User.bio ? User.bio : '自己紹介文はまだ設定されていません'}</Text>
        </Box>
        <HStack spacing="6">
          <Text color="gray.600" fontSize="sm">
            性別: {User.sex ? User.sex : '未設定'}
          </Text>
          <Text color="gray.600" fontSize="sm">
            skate歴: {typeof User.skating_history === "number" && SkatingHistoryConst[User.skating_history]! ? SkatingHistoryConst[User.skating_history] : '未設定'}{' '}
          </Text>
        </HStack>
      </Box>
    </Flex>
  );
};
