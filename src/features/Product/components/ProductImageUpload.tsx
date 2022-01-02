import { VFC, useState } from 'react';
import { Text, Spinner, Box } from '@chakra-ui/react';
import { supabase } from '../../../libs/supabase-client';
import { useShowToast } from '../../../hooks/useShowToast';
import { useUpdateProductImage } from '../';
import type { Product } from '../';
import Resizer from 'react-image-file-resizer';

type Props = {
  product: Product;
};

export const ProductImageUpload: VFC<Props> = ({ product }) => {
  const { updateProductImage } = useUpdateProductImage();
  const [uploading, setUploading] = useState(false);
  const { showToast } = useShowToast();

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }
      const file = await resizeFile(event.target.files[0]);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // avatars/${Math.random()}.${fileExt} に保存。
      const { data, error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const resizeFile = (file: File): Promise<File> => {
    return new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        'JPEG',
        70,
        0,
        (file) => {
          resolve(file as File);
        },
        'file'
      );
    });
  };

  // filePathからURLを取得しDBを更新。
  const onUpload = async (filePath: string) => {
    try {
      const { publicURL, error } = await supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      if (error) {
        throw error;
      }

      if (publicURL) {
        await updateProductImage(product.id, publicURL);
        showToast('商品画像を更新しました', '', 'success');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {uploading ? (
        <Box textAlign="center">
          <Spinner />
        </Box>
      ) : (
        <Text as="label" htmlFor="single" textAlign="center" color="blue.500" fontWeight="bold">
          商品画像を追加
        </Text>
      )}
      <input
        style={{
          visibility: 'hidden',
          position: 'absolute',
          width: '100px',
        }}
        type="file"
        id="single"
        accept="image/*"
        onChange={uploadAvatar}
        disabled={uploading}
      />
    </>
  );
};
