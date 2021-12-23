import type { NextPage, GetServerSideProps } from 'next';
import { VStack } from '@chakra-ui/react';

const ProductIndex: NextPage = () => {
  return <VStack spacing={16}></VStack>;
};

export default ProductIndex;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const id = context.params?.id as string;
//   const { data, error, status } = await supabase
//     .from('products')
//     .select(
//       `
//   *,
//   brands (
//     *
//   )
// `
//     )
//     .eq('id', id)
//     .single();
//   if (error && status !== 406) {
//     throw error;
//   }
//   return {
//     props: {
//       product: data,
//     },
//   };
// };
