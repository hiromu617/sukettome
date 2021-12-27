import type { NextPage } from 'next';
import { ReviewForm } from '../../../../src/features/Review';
import { BreadcrumbNav } from '../../../../src/components/Layout/BreadcrumbNav';
import { useRouter } from 'next/router';

type ReviewForm = {
  rate: number;
  body: string;
};

const ReviewNew: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <BreadcrumbNav
        lists={[
          { name: 'HOME', href: '/' },
          { name: `${router.query.name}`, href: `/products/${router.query.id}` },
          { name: `${router.query.name}のレビュー投稿`, href: ``, isCurrentPage: true },
        ]}
      />
      <ReviewForm productId={Number(router.query.id as string)} />
    </>
  );
};

export default ReviewNew;
