
import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { useDeleteGrupos } from '@/hooks/api/grupo/useDeleteGrupos';
import { useToast } from '@/hooks/use-toast';
import { MessagesResource } from '@/i18n/resources';
import { ConfirmationDialog } from '@/components/modals/ConfirmationDialog';
import { useState } from 'react';

interface DeleteGroupsDialogProps {
  selected: string[];
  onDeleteSuccess: () => void;
}

export const DeleteGroupsDialog = ({
  selected,
  onDeleteSuccess,
}: DeleteGroupsDialogProps) => {
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const { toast } = useToast();
  const deleteGrupos = useDeleteGrupos();

  const handleDeleteClick = () => {
    if (selected.length === 0) {
      toast({
        title: MessagesResource.ERROR,
        description: MessagesResource.SELECT_AT_LEAST_ONE_GROUP,
        variant: 'destructive',
      });
      return;
    }
    setConfirmModalOpen(true);
  };

  const confirmDeleteGroups = () => {
    deleteGrupos.mutateAsync({ ListaGrupos: selected }).then(
      (success) => {
        if (success) {
          toast({
            title: MessagesResource.SUCCESS,
            description: MessagesResource.GROUPS_DELETED_SUCCESSFULLY,
          });
          onDeleteSuccess();
        } else {
          toast({
            title: MessagesResource.ERROR,
            description: MessagesResource.ERROR_DELETING_GROUPS,
            variant: 'destructive',
          });
        }
        setConfirmModalOpen(false);
      },
      (error) => {
        console.error('Error deleting groups:', error);
        toast({
          title: MessagesResource.ERROR,
          description: MessagesResource.ERROR_DELETING_GROUPS,
          variant: 'destructive',
        });
        setConfirmModalOpen(false);
      }
    );
  };

  return (
    <>
      <Button
        variant="destructive"
        onClick={handleDeleteClick}
        disabled={selected.length === 0}
      >
        <Trash2 size={16} className="mr-2" />
        {MessagesResource.DELETE_GROUPS}
      </Button>

      <ConfirmationDialog
        isOpen={confirmModalOpen}
        onOpenChange={setConfirmModalOpen}
        title={MessagesResource.CONFIRM_DELETION}
        description={MessagesResource.DELETE_GROUPS_CONFIRMATION}
        onConfirm={confirmDeleteGroups}
        onCancel={() => setConfirmModalOpen(false)}
      />
    </>
  );
};
