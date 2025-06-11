import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useDetalhes } from '../DetalhesContext';

import { DateField } from '@/components/inputs/DateField';
import { Button } from '@/components/ui/button';
import { MessagesResource } from '@/i18n/resources';

const pontosFilterSchema = yup.object().shape({
  DT_Ponto: yup.string().required(MessagesResource.REQUIRED),
});

type FilterFormValues = yup.InferType<typeof pontosFilterSchema>;

const getTodayDate = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

const formatDateToInput = (date: Date) => date.toISOString().split('T')[0];

const parseInputToDate = (input: string) => new Date(input);

export const PontosFilter = () => {
  const { pontosQueryParams, setPontosQueryParams } = useDetalhes();

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<FilterFormValues>({
    resolver: yupResolver(pontosFilterSchema),
    defaultValues: {
      DT_Ponto: formatDateToInput(pontosQueryParams.DT_Ponto),
    },
  });

  const onSubmit = (data: FilterFormValues) => {
    setPontosQueryParams({
      DT_Ponto: parseInputToDate(data.DT_Ponto),
    });
  };

  const handleClearFilters = () => {
    const today = getTodayDate();
    reset({
      DT_Ponto: formatDateToInput(today),
    });
    setPontosQueryParams({
      DT_Ponto: today,
    });
  };

  return (
    <div className="mb-4 p-4 rounded-md border">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-end space-x-4"
      >
        <div className="w-full">
          <DateField
            label={MessagesResource.DATE}
            register={register('DT_Ponto')}
            error={errors.DT_Ponto?.message}
            max={formatDateToInput(new Date())}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={handleClearFilters}>
            {MessagesResource.CLEAR}
          </Button>
          <Button type="submit">{MessagesResource.FILTER}</Button>
        </div>
      </form>
    </div>
  );
};
