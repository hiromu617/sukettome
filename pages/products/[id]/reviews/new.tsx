import type { NextPage } from 'next';
import { useEffect } from 'react';
import { VStack } from '@chakra-ui/react';
import { useCurrentUser } from '../../../../src/features/User';
import { useLoginModal } from '../../../../src/features/Auth';
import { useShowToast } from '../../../../src/hooks/useShowToast';
import { useRouter } from 'next/router';

const ProductId: NextPage = () => {
  const { currentUser } = useCurrentUser();
  const { onOpen } = useLoginModal();
  const { showToast } = useShowToast();
  const router = useRouter()
  console.log(router.query.id)
  useEffect(() => {
    if (!currentUser) {
      onOpen();
      showToast('ログインしてください', '', 'error');
    }
  }, [currentUser]);

  return <>NewReview</>;
};

export default ProductId;
