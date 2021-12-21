import { VFC, useState, useEffect } from 'react';
import { Icon, Button } from '@chakra-ui/react';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { useCurrentUser } from '../../User';
import useSWR from 'swr';
import { supabase } from '../../../libs/supabase-client';
import { useShowToast } from '../../../hooks/useShowToast';

type LikeButtonProps = {
  productId: number;
};

export const LikeButton: VFC<LikeButtonProps> = ({ productId }) => {
  const { currentUser } = useCurrentUser();
  const [likeCount, setLikeCount] = useState<number>(0);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const { showToast } = useShowToast();

  const fetcher = async () => {
    const { data, error, status, count } = await supabase
      .from('likes')
      .select('user_id', { count: 'exact' })
      .eq('product_id', productId);

    if (error && status !== 406) {
      console.error(error);
      throw error;
    }
    if (data && count) {
      setLikeCount(count);
      return data;
    }
    setLikeCount(0);
    return [];
  };
  const { data: likes, mutate } = useSWR(`/${productId}/likes`, fetcher, {
    refreshInterval: 1000,
    errorRetryCount: 10,
  });

  useEffect(() => {
    if (likes && likes.filter((like) => like.user_id === currentUser?.id).length > 0) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [likes, currentUser]);

  const handleLike = () => {
    if (!currentUser) {
      showToast('ログインしてください', '', 'warning');
      return;
    }
    if (isLiked) {
      unlike();
    } else {
      like();
    }
  };

  const like = async () => {
    if (!currentUser) return;
    setIsLoading(true);
    if (loading) return;
    const { data, error, status } = await supabase.from('likes').insert([
      {
        product_id: productId,
        user_id: currentUser.id,
      },
    ]);

    if (error && status !== 406) {
      console.error(error);
      throw error;
    }

    if (data) {
      // console.log(data);
      await mutate();
      setIsLoading(false);
      console.log('success!');
    }
  };
  
  const unlike = async () => {
    if (!currentUser) return;
    if (loading) return;
    setIsLoading(true);
    const { data, error, status } = await supabase.from('likes').delete().match({
      product_id: productId,
      user_id: currentUser.id,
    });

    if (error && status !== 406) {
      console.error(error);
      throw error;
    }

    if (data) {
      // console.log(data);
      await mutate();
      setIsLoading(false);
      console.log('success!');
    }
  };

  return (
    <Button
      size="md"
      leftIcon={<Icon as={isLiked ? FcLike : FcLikePlaceholder} w={6} h={6} />}
      onClick={handleLike}
    >
      調子イイ！({likeCount})
    </Button>
  );
};
