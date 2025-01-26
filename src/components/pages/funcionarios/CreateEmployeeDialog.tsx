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
import { UseMutateFunction } from '@tanstack/react-query';

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

  function onSaveEmployee(values: NovoFuncionarioForm) {
    onSubmit(values);
    onOpenChange(false);
  }

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
        <CreateEmployeeForm isPending={isPending} onSubmit={onSaveEmployee} />
      </DialogContent>
    </Dialog>
  );
};
