import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import * as yup from 'yup';

import { DateField } from '@/components/inputs/DateField';
import { Button } from '@/components/ui/button';
import { MessagesResource } from '@/i18n/resources';

// Define o esquema de validação (opcional neste caso)
const pontosFilterSchema = yup.object().shape({
  DT_Ponto: yup.string(),
});

// Tipo inferido do esquema
type FilterFormValues = yup.InferType<typeof pontosFilterSchema>;

const getTodayLocalDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const PontosFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    handleSubmit,
    reset,
    formState: { errors },
    register,
  } = useForm<FilterFormValues>({
    resolver: yupResolver(pontosFilterSchema),
    defaultValues: {
      DT_Ponto: searchParams.get('DT_Ponto') || getTodayLocalDate(),
    },
  });

  const onSubmit = (data: FilterFormValues) => {
    const params = new URLSearchParams();

    if (data.DT_Ponto) {
      params.set('DT_Ponto', data.DT_Ponto);
    } else {
      params.delete('DT_Ponto');
    }

    setSearchParams(params);
  };

  const handleClearFilters = () => {
    reset({
      DT_Ponto: '',
    });
    setSearchParams({});
  };

  return (
    <div className="mb-4 p-4 rounded-md border">
      <h2 className="text-lg font-medium mb-4">
        {MessagesResource.FILTER_POINTS}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <DateField
            label={MessagesResource.DATE}
            register={register('DT_Ponto')}
            error={errors.DT_Ponto?.message}
            max={new Date().toISOString().split('T')[0]}
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
