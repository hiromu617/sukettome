import React, { VFC } from 'react';
import { Text } from '@chakra-ui/layout';

type ErrorMessageProps = {
  children: string;
};

export const ErrorMessage: VFC<ErrorMessageProps> = ({ children }) => {
  return (
    <Text color="red.500" fontSize="sm" lineHeight="0">
      {children}
    </Text>
  );
};
