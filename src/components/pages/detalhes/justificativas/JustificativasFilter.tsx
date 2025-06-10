import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useDetalhes } from '../DetalhesContext';

import { MonthSelect } from '@/components/inputs/MonthSelect';
import { YearSelect } from '@/components/inputs/YearSelect';
import { Button } from '@/components/ui/button';
import { MessagesResource } from '@/i18n/resources';

const justicativasFilterSchema = yup.object().shape({
  Mes: yup
    .number()
    .required(MessagesResource.REQUIRED)
    .min(1, MessagesResource.INVALID)
    .max(12, MessagesResource.INVALID),
  Ano: yup
    .number()
    .required(MessagesResource.REQUIRED)
    .min(1900, MessagesResource.INVALID)
    .max(new Date().getFullYear(), MessagesResource.INVALID),
});

type FilterFormValues = yup.InferType<typeof justicativasFilterSchema>;

export const JustificativasFilter = () => {
  const { justificativasQueryParams, setJustificativasQueryParams } =
    useDetalhes();

  const {
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FilterFormValues>({
    resolver: yupResolver(justicativasFilterSchema),
    defaultValues: {
      Mes: justificativasQueryParams.Mes,
      Ano: justificativasQueryParams.Ano,
    },
  });

  const mes = watch('Mes').toString();
  const ano = watch('Ano').toString();

  const onSubmit = (data: FilterFormValues) => {
    setJustificativasQueryParams({
      Mes: data.Mes,
      Ano: data.Ano,
    });
  };

  const handleClearFilters = () => {
    const today = new Date();
    const defaultMes = today.getMonth() + 1;
    const defaultAno = today.getFullYear();

    reset({
      Mes: defaultMes,
      Ano: defaultAno,
    });

    setJustificativasQueryParams({
      Mes: defaultMes,
      Ano: defaultAno,
    });
  };

  // Como MonthSelect e YearSelect usam onChange(string), convertemos para número ao setar no form
  const handleMonthChange = (value: string) => {
    setValue('Mes', Number(value), { shouldValidate: true });
  };

  const handleYearChange = (value: string) => {
    setValue('Ano', Number(value), { shouldValidate: true });
  };

  return (
    <div className="mb-4 p-4 rounded-md border">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-end space-x-4"
      >
        <div className="w-1/2">
          <MonthSelect
            value={mes}
            onChange={handleMonthChange}
            label={MessagesResource.MONTH}
          />
          {errors.Mes && (
            <p className="text-sm text-red-600 mt-1">{errors.Mes.message}</p>
          )}
        </div>

        <div className="w-1/2">
          <YearSelect
            value={Number(ano)}
            onChange={handleYearChange}
            label={MessagesResource.YEAR}
          />
          {errors.Ano && (
            <p className="text-sm text-red-600 mt-1">{errors.Ano.message}</p>
          )}
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
