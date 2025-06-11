import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { MessagesResource } from '@/i18n/resources';

interface CreateGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: NovoGrupoForm) => void;
  isPending: boolean;
}

interface NovoGrupoForm {
  Nome: string;
}

export const CreateGroupDialog = ({
  open,
  onOpenChange,
  onSubmit,
  isPending,
}: CreateGroupDialogProps) => {
  const { register, handleSubmit } = useForm<NovoGrupoForm>();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2" />
          {MessagesResource.CREATE_GROUP}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{MessagesResource.NEW}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder={MessagesResource.GROUP_NAME}
              {...register('Nome', { required: true })}
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? MessagesResource.SAVING : MessagesResource.SAVE}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
