
import { useMemo, useState } from 'react';

import { PageHeader } from '@/components/layout/PageHeader';
import { LoadingMessage } from '@/components/LoadingMessage';
import { CreateEmployeeDialog } from '@/components/pages/funcionarios/CreateEmployeeDialog';
import { CreateGroupDialog } from '@/components/pages/funcionarios/CreateGroupDialog';
import { DeleteGroupsDialog } from '@/components/pages/funcionarios/DeleteGroupsDialog';
import { GrupoAccordionItem } from '@/components/pages/funcionarios/GrupoAccordionItem';
import { Accordion } from '@/components/ui/accordion';
import { useCreateFuncionario } from '@/hooks/api/funcionario/useCreateFuncionario';
import { useCreateGrupo } from '@/hooks/api/grupo/useCreateGrupo';
import { useGetGruposByLogin } from '@/hooks/api/grupo/useGetGruposByLogin';
import { MessagesResource } from '@/i18n/resources';
import { CreateFuncionarioCommand } from '@/services/types/funcionario';
import { CreateGrupoCommand } from '@/services/types/grupo';

const Funcionarios = () => {
  const [openGroup, setOpenGroup] = useState(false);
  const [openEmployee, setOpenEmployee] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const fetchGrupos = useGetGruposByLogin();
  const mutateGrupos = useCreateGrupo();
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

  function handleDeleteSuccess() {
    fetchGrupos.refetch();
    setSelected([]);
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
          <DeleteGroupsDialog 
            selected={selected} 
            onDeleteSuccess={handleDeleteSuccess} 
          />
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
    </>
  );
};

export default Funcionarios;
