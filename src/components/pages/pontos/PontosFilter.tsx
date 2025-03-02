import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import { DateField } from '@/components/inputs/DateField';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { MessagesResource } from '@/i18n/resources';

interface FilterFormValues {
  DT_Ponto: string;
}

export const PontosFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const form = useForm<FilterFormValues>({
    defaultValues: {
      DT_Ponto: searchParams.get('DT_Ponto') || '',
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
    form.reset({
      DT_Ponto: '',
    });
    setSearchParams({});
  };

  return (
    <div className="mb-4 p-4 rounded-md border">
      <h2 className="text-lg font-medium mb-4">
        {MessagesResource.FILTER_POINTS}
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="DT_Ponto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{MessagesResource.DATE}</FormLabel>
                  <FormControl>
                    <DateField label="" register={field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClearFilters}
            >
              {MessagesResource.CLEAR}
            </Button>
            <Button type="submit">{MessagesResource.FILTER}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
