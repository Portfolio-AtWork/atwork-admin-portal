import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { UserPlus } from 'lucide-react';
import { NovoFuncionarioForm } from './forms/createEmployee/CreateEmployeeTypes';
import { CreateEmployeeForm } from './forms/createEmployee/CreateEmployeeForm';

interface CreateEmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: NovoFuncionarioForm) => void;
  isPending: boolean;
}

export const CreateEmployeeDialog = ({
  open,
  onOpenChange,
  onSubmit,
  isPending,
}: CreateEmployeeDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <UserPlus className="mr-2" />
          {t('createEmployee')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('new')}</DialogTitle>
        </DialogHeader>
        <CreateEmployeeForm isPending={isPending} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};
