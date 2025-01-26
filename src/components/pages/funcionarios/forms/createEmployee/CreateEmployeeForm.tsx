import { GrupoSelect } from '@/components/inputs/GrupoSelect';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { createEmployeeValidationSchema } from './CreateEmployeeValidation';
import { NovoFuncionarioForm } from './CreateEmployeeTypes';
import { TextField } from '@/components/inputs/TextField';

export const CreateEmployeeForm = ({ isPending, onSubmit }) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<NovoFuncionarioForm>({
    resolver: yupResolver(createEmployeeValidationSchema),
  });

  const handleGroupSelect = (value: string) => {
    setValue('ID_Grupo', value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <TextField
          label={t('name')}
          register={register('Nome')}
          error={errors.Nome?.message}
          placeholder={t('name')}
        />
      </div>
      <div className="space-y-1">
        <TextField
          label={t('login')}
          register={register('Login')}
          error={errors.Login?.message}
          placeholder={t('login')}
        />
      </div>
      <div className="space-y-1">
        <TextField
          label={t('password')}
          register={register('Senha')}
          error={errors.Senha?.message}
          placeholder={t('password')}
        />
      </div>
      <div className="space-y-1">
        <TextField
          label={t('confirmPassword')}
          register={register('ConfirmarSenha')}
          error={errors.ConfirmarSenha?.message}
          placeholder={t('confirmPassword')}
        />
      </div>
      <div className="space-y-1">
        <TextField
          label={t('email')}
          register={register('Email')}
          error={errors.Email?.message}
          placeholder={t('email')}
        />
      </div>
      <div className="space-y-1">
        <GrupoSelect
          label={t('group')}
          onValueChange={handleGroupSelect}
          value={getValues().ID_Grupo}
          error={errors.ID_Grupo?.message}
        />
      </div>
      <DialogFooter>
        <Button type="submit" disabled={isPending}>
          {isPending ? t('saving') : t('save')}
        </Button>
      </DialogFooter>
    </form>
  );
};
