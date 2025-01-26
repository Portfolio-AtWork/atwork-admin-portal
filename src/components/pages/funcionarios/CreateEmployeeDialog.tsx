import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
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
import { UserPlus } from 'lucide-react';
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

const schema: yup.ObjectSchema<NovoFuncionarioForm> = yup.object({
  Nome: yup.string().required('Nome é obrigatório'),
  Login: yup.string().required('Login é obrigatório'),
  Senha: yup.string()
    .required('Senha é obrigatória')
    .min(6, 'Senha deve ter no mínimo 6 caracteres'),
  ConfirmarSenha: yup.string()
    .required('Confirmação de senha é obrigatória')
    .oneOf([yup.ref('Senha')], 'As senhas devem ser iguais'),
  ID_Grupo: yup.string().required('Grupo é obrigatório'),
  Email: yup.string()
    .required('Email é obrigatório')
    .email('Email inválido'),
}).required();

export const CreateEmployeeDialog = ({
  open,
  onOpenChange,
  onSubmit,
  isPending,
}: CreateEmployeeDialogProps) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<NovoFuncionarioForm>({
    resolver: yupResolver(schema),
  });

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
              {...register('Nome')}
            />
            {errors.Nome && (
              <p className="text-sm text-red-500">{errors.Nome.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>{t('login')}</Label>
            <Input
              placeholder={t('login')}
              {...register('Login')}
            />
            {errors.Login && (
              <p className="text-sm text-red-500">{errors.Login.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>{t('password')}</Label>
            <Input
              type="password"
              placeholder={t('password')}
              {...register('Senha')}
            />
            {errors.Senha && (
              <p className="text-sm text-red-500">{errors.Senha.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>{t('confirmPassword')}</Label>
            <Input
              type="password"
              placeholder={t('confirmPassword')}
              {...register('ConfirmarSenha')}
            />
            {errors.ConfirmarSenha && (
              <p className="text-sm text-red-500">{errors.ConfirmarSenha.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>{t('email')}</Label>
            <Input
              type="email"
              placeholder={t('email')}
              {...register('Email')}
            />
            {errors.Email && (
              <p className="text-sm text-red-500">{errors.Email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>{t('group')}</Label>
            <GrupoSelect
              onValueChange={handleGroupSelect}
              value={getValues().ID_Grupo}
            />
            {errors.ID_Grupo && (
              <p className="text-sm text-red-500">{errors.ID_Grupo.message}</p>
            )}
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