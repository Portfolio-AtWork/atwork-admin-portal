import { FC } from 'react';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { MessagesResource } from '@/i18n/resources';

interface ImageDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  base64Image: string | null;
  title?: string;
  onClose: () => void;
  mimeType?:
    | 'image/jpeg'
    | 'image/png'
    | 'image/gif'
    | 'image/bmp'
    | 'image/webp'
    | 'image/jpg'
    | undefined;
}

export const ImageDialog: FC<ImageDialogProps> = ({
  isOpen,
  onOpenChange,
  base64Image,
  title = 'Visualizar Imagem',
  onClose,
  mimeType = 'image/png',
}) => {
  if (!base64Image) return null;

  const src = base64Image.startsWith('data:image/')
    ? base64Image
    : `data:${mimeType};base64,${base64Image}`;

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-3xl p-6">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">{title}</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="mt-4 flex justify-center">
          <img
            src={src}
            alt="Imagem Base64"
            className="max-w-full max-h-[70vh] rounded-md shadow"
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>
            {MessagesResource.CLOSE}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
