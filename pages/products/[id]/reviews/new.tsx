import type { NextPage } from 'next';
import { ReviewForm } from '../../../../src/features/Review';
import { useRouter } from 'next/router';

type ReviewForm = {
  rate: number;
  body: string;
};

const ReviewNew: NextPage = () => {
  const router = useRouter();

  return <ReviewForm productId={Number(router.query.id as string)} />;
};

export default ReviewNew;
