import { VFC } from 'react';
import type { User } from '../index';
import {
  Box,
  Flex,
  Avatar,
  IconButton,
  Spacer,
  useDisclosure,
  SkeletonCircle,
  HStack,
  Center,
  Heading,
  Text,
} from '@chakra-ui/react';

type UserInfoProps = {
  User: User;
};

export const UserInfo: VFC<UserInfoProps> = ({ User }) => {
  return (
    <Flex alignItems="base" bg="white" px={4} py={6} shadow="lg" borderRadius="lg">
      <Center>
        <Avatar name={User.user_name} src={User.avatar_url} size="xl" />
      </Center>
      <Box h="full" flex="1" px={6}>
        <Heading color="gray.600" size="md">
          {User.user_name}
        </Heading>
        <Box py={4}>
          <Text color="gray.600">{User.bio ? User.bio : '自己紹介文はまだ設定されていません'}</Text>
        </Box>
        <HStack spacing="6">
          <Text color="gray.600" fontSize="sm">性別: {User.sex ? User.sex : '未設定'} </Text>
          <Text color="gray.600" fontSize="sm">
            skate歴: {User.skating_history ? User.skating_history : '未設定'}{' '}
          </Text>
        </HStack>
      </Box>
    </Flex>
  );
};
