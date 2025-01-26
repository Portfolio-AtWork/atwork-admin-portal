import { GrupoSelect } from '@/components/inputs/GrupoSelect';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { createEmployeeValidationSchema } from './CreateEmployeeValidation';
import { NovoFuncionarioForm } from './CreateEmployeeTypes';
import { TextField } from '@/components/inputs/TextField';
import { MessagesResource } from '@/i18n/resources';

export const CreateEmployeeForm = ({ isPending, onSubmit }) => {
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
          label={MessagesResource.NAME}
          register={register('Nome')}
          error={errors.Nome?.message}
        />
      </div>
      <div className="space-y-1">
        <TextField
          label={MessagesResource.LOGIN}
          register={register('Login')}
          error={errors.Login?.message}
        />
      </div>
      <div className="space-y-1">
        <TextField
          label={MessagesResource.PASSWORD}
          register={register('Senha')}
          error={errors.Senha?.message}
        />
      </div>
      <div className="space-y-1">
        <TextField
          label={MessagesResource.CONFIRM_PASSWORD}
          register={register('ConfirmarSenha')}
          error={errors.ConfirmarSenha?.message}
        />
      </div>
      <div className="space-y-1">
        <TextField
          label={MessagesResource.EMAIL}
          register={register('Email')}
          error={errors.Email?.message}
        />
      </div>
      <div className="space-y-1">
        <GrupoSelect
          label={MessagesResource.GROUP}
          onValueChange={handleGroupSelect}
          value={getValues().ID_Grupo}
          error={errors.ID_Grupo?.message}
        />
      </div>
      <DialogFooter>
        <Button type="submit" disabled={isPending}>
          {isPending ? MessagesResource.SAVING : MessagesResource.SAVE}
        </Button>
      </DialogFooter>
    </form>
  );
};
