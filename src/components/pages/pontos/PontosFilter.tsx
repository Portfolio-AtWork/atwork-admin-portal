
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MessagesResource } from '@/i18n/resources';

interface FilterFormValues {
  startDate: string;
  endDate: string;
}

export const PontosFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const form = useForm<FilterFormValues>({
    defaultValues: {
      startDate: searchParams.get('startDate') || '',
      endDate: searchParams.get('endDate') || '',
    },
  });

  const onSubmit = (data: FilterFormValues) => {
    const params = new URLSearchParams();
    
    if (data.startDate) {
      params.set('startDate', data.startDate);
    } else {
      params.delete('startDate');
    }
    
    if (data.endDate) {
      params.set('endDate', data.endDate);
    } else {
      params.delete('endDate');
    }
    
    setSearchParams(params);
  };

  const handleClearFilters = () => {
    form.reset({
      startDate: '',
      endDate: '',
    });
    setSearchParams({});
  };

  return (
    <div className="mb-4 p-4 rounded-md border">
      <h2 className="text-lg font-medium mb-4">{MessagesResource.FILTER_POINTS}</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{MessagesResource.START_DATE}</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{MessagesResource.END_DATE}</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                    />
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
            <Button type="submit">
              {MessagesResource.FILTER}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
