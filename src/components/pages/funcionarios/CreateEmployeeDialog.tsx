import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { GrupoSelect } from '@/components/inputs/GrupoSelect';

import { SeparatorHorizontal, UserPlus } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Separator } from '@radix-ui/react-separator';

interface CreateEmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: NovoFuncionarioForm) => void;
  isPending: boolean;
}

interface NovoFuncionarioForm {
  Nome: string;
  Login: string;
  Senha: string;
  ConfirmarSenha: string;
  ID_Grupo: string;
  Email: string;
}

export const CreateEmployeeDialog = ({
  open,
  onOpenChange,
  onSubmit,
  isPending,
}: CreateEmployeeDialogProps) => {
  const { t } = useTranslation();
  const { register, handleSubmit, setValue, getValues } =
    useForm<NovoFuncionarioForm>();

  const handleGroupSelect = (value: string) => {
    setValue('ID_Grupo', value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <UserPlus className="mr-2" />
          {t('create')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('new')}</DialogTitle>
        </DialogHeader>
        <Separator />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>{t('name')}</Label>
            <Input
              placeholder={t('name')}
              {...register('Nome', { required: true })}
            />
          </div>
          <div className="space-y-2">
            <Label>{t('login')}</Label>
            <Input
              placeholder={t('login')}
              {...register('Login', { required: true })}
            />
          </div>
          <div className="space-y-2">
            <Label>{t('password')}</Label>
            <Input
              type="password"
              placeholder={t('password')}
              {...register('Senha', { required: true })}
            />
          </div>
          <div className="space-y-2">
            <Label>{t('confirmPassword')}</Label>
            <Input
              type="password"
              placeholder={t('confirmPassword')}
              {...register('ConfirmarSenha', { required: true })}
            />
          </div>
          <div className="space-y-2">
            <Label>{t('email')}</Label>
            <Input
              type="email"
              placeholder={t('email')}
              {...register('Email', { required: true })}
            />
          </div>
          <div className="space-y-2">
            <Label>{t('group')}</Label>
            <GrupoSelect
              onValueChange={handleGroupSelect}
              value={getValues().ID_Grupo}
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? t('creating') : t('create')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
