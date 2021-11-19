import { useToast } from '@chakra-ui/react';

export const useShowToast = () => {
  const toast = useToast();
  const showToast = (
    title: string,
    description?: string,
    status?: 'success' | 'info' | 'warning' | 'error'
  ) => {
    toast({
      title: title,
      description: description,
      status: status,
      position: 'bottom',
      duration: 9000,
      isClosable: true,
    });
  };
  return { showToast };
};
