
import React from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { MessagesResource } from '@/i18n/resources';

interface CancellationModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  itemName?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const CancellationModal: React.FC<CancellationModalProps> = ({
  isOpen,
  onOpenChange,
  title = MessagesResource.CONFIRM_CANCELLATION,
  description = MessagesResource.CANCEL_EMPLOYEE_CONFIRMATION,
  itemName = '',
  onConfirm,
  onCancel,
}) => {
  const formattedDescription = itemName 
    ? description.replace('{0}', itemName) 
    : description;

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {formattedDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>
            {MessagesResource.NO}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {MessagesResource.YES}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
