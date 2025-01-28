import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { MessagesResource } from '@/i18n/resources';

interface PasswordChangeForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const PasswordChangeCard = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const form = useForm<PasswordChangeForm>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: PasswordChangeForm) => {
    if (data.newPassword !== data.confirmPassword) {
      toast({
        title: MessagesResource.ERROR,
        description: MessagesResource.PASSWORDS_DO_NOT_MATCH,
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: MessagesResource.SUCCESS,
      description: MessagesResource.PASSWORD_CHANGED,
    });
    form.reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{MessagesResource.CHANGE_PASSWORD}</CardTitle>
        <CardDescription>{MessagesResource.UPDATE_PASSWORD}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{MessagesResource.CURRENT_PASSWORD}</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{MessagesResource.NEW_PASSWORD}</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{MessagesResource.CONFIRM_NEW_PASSWORD}</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">{MessagesResource.CHANGE_PASSWORD}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
