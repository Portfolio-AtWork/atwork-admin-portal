import { Trash2 } from 'lucide-react';
import { useState } from 'react';

import { ConfirmationDialog } from '@/components/modals/ConfirmationDialog';
import { Button } from '@/components/ui/button';
import { useDeleteGrupos } from '@/hooks/api/grupo/useDeleteGrupos';
import { useToast } from '@/hooks/use-toast';
import { MessagesResource } from '@/i18n/resources';

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
    deleteGrupos.mutateAsync({ ListaGrupos: selected }).then(() => {
      setConfirmModalOpen(false);
      onDeleteSuccess();
    });
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
