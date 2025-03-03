import { useMemo, useState } from 'react';

import { PageHeader } from '@/components/layout/PageHeader';
import { LoadingMessage } from '@/components/LoadingMessage';
import { ConfirmationDialog } from '@/components/modals/ConfirmationDialog';
import { CreateEmployeeDialog } from '@/components/pages/funcionarios/CreateEmployeeDialog';
import { CreateGroupDialog } from '@/components/pages/funcionarios/CreateGroupDialog';
import { GrupoAccordionItem } from '@/components/pages/funcionarios/GrupoAccordionItem';
import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { useCreateFuncionario } from '@/hooks/api/funcionario/useCreateFuncionario';
import { useCreateGrupo } from '@/hooks/api/grupo/useCreateGrupo';
import { useDeleteGrupos } from '@/hooks/api/grupo/useDeleteGrupos';
import { useGetGruposByLogin } from '@/hooks/api/grupo/useGetGruposByLogin';
import { useToast } from '@/hooks/use-toast';
import { MessagesResource } from '@/i18n/resources';
import { CreateFuncionarioCommand } from '@/services/types/funcionario';
import { CreateGrupoCommand } from '@/services/types/grupo';
import { Trash2 } from 'lucide-react';

const Funcionarios = () => {
  const [openGroup, setOpenGroup] = useState(false);
  const [openEmployee, setOpenEmployee] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const { toast } = useToast();
  const fetchGrupos = useGetGruposByLogin();
  const mutateGrupos = useCreateGrupo();
  const deleteGrupos = useDeleteGrupos();
  const mutateFunc = useCreateFuncionario();

  function addFuncionario(values: CreateFuncionarioCommand) {
    mutateFunc.mutateAsync(values).then((response) => {
      if (response) {
        fetchGrupos.refetch();
        setOpenEmployee(false);
      }
    });
  }

  function addGrupo(values: CreateGrupoCommand) {
    mutateGrupos.mutateAsync(values).then((response) => {
      if (response) {
        fetchGrupos.refetch();
        setOpenGroup(false);
      }
    });
  }

  function handleDeleteGroups() {
    if (selected.length === 0) {
      toast({
        title: MessagesResource.ERROR,
        description: MessagesResource.SELECT_AT_LEAST_ONE_GROUP,
        variant: "destructive"
      });
      return;
    }
    setDeleteModalOpen(true);
  }

  function confirmDeleteGroups() {
    deleteGrupos.mutateAsync({ ListaGrupos: selected }).then((response) => {
      if (response) {
        toast({
          title: MessagesResource.SUCCESS,
          description: MessagesResource.GROUPS_DELETED_SUCCESSFULLY
        });
        fetchGrupos.refetch();
        setSelected([]);
        setDeleteModalOpen(false);
      }
    }).catch((error) => {
      toast({
        title: MessagesResource.ERROR,
        description: error.message || MessagesResource.ERROR_DELETING_GROUPS,
        variant: "destructive"
      });
    });
  }

  const RenderGrupos = useMemo(
    () => () => {
      if (!fetchGrupos.data?.length) return null;

      return (
        <Accordion type="multiple" className="w-full">
          {fetchGrupos.data.map((grupo) => (
            <GrupoAccordionItem
              key={grupo.ID}
              grupo={grupo}
              selected={selected}
              setSelected={setSelected}
            />
          ))}
        </Accordion>
      );
    },
    [fetchGrupos.data, selected],
  );

  return (
    <>
      <PageHeader title={MessagesResource.EMPLOYEE_GROUPS}>
        <div className="flex gap-2">
          <Button
            variant="destructive"
            onClick={handleDeleteGroups}
            disabled={selected.length === 0}
          >
            <Trash2 size={16} />
            {MessagesResource.DELETE}
          </Button>
          <CreateEmployeeDialog
            open={openEmployee}
            onOpenChange={setOpenEmployee}
            onSubmit={addFuncionario}
            isPending={mutateFunc.isPending}
          />
          <CreateGroupDialog
            open={openGroup}
            onOpenChange={setOpenGroup}
            onSubmit={addGrupo}
            isPending={mutateGrupos.isPending}
          />
        </div>
      </PageHeader>
      <LoadingMessage
        isLoading={fetchGrupos.isLoading}
        error={fetchGrupos.error}
      />
      <RenderGrupos />

      <ConfirmationDialog
        isOpen={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        title={MessagesResource.CONFIRM_DELETION}
        description={MessagesResource.DELETE_GROUPS_CONFIRMATION}
        onConfirm={confirmDeleteGroups}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </>
  );
};

export default Funcionarios;
