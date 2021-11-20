import { VFC, useState } from 'react';
import {
  Avatar,
  Box,
  Text,
} from '@chakra-ui/react';
import { User, useUpdateUserAvatarUrl } from '..';
import { supabase } from '../../../libs/supabase-client';
import { useShowToast } from '../../../hooks/useShowToast';

type AvatarUploadProps = {
  currentUser: User;
};

export const AvatarUpload: VFC<AvatarUploadProps> = ({ currentUser }) => {
  const { updateUserAvatarUrl } = useUpdateUserAvatarUrl();
  const [uploading, setUploading] = useState(false);
  const { showToast } = useShowToast();

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data, error: uploadError } = await supabase.storage
        .from('avatars')
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

  const onUpload = async (filePath: string) => {
    try {
      const { publicURL, error } = await supabase.storage.from('avatars').getPublicUrl(filePath);

      if (error) {
        throw error;
      }

      if (publicURL) {
        updateUserAvatarUrl(currentUser.id, publicURL);
        showToast('プロフィール画像を更新しました', '', 'success')
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Avatar name={currentUser.user_name} src={currentUser.avatar_url} size="xl" />
      <Text as="label" htmlFor="single" textAlign="center" color="blue.500" fontWeight="bold">変更</Text>
      <input
        style={{
          visibility: 'hidden',
          position: 'absolute',
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
