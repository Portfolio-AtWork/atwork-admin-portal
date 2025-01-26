import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PageHeader } from '@/components/layout/PageHeader';
import { LoadingMessage } from '@/components/LoadingMessage';
import { CreateEmployeeDialog } from '@/components/pages/funcionarios/CreateEmployeeDialog';
import { CreateGroupDialog } from '@/components/pages/funcionarios/CreateGroupDialog';
import { GrupoAccordionItem } from '@/components/pages/funcionarios/GrupoAccordionItem';
import { Accordion } from '@/components/ui/accordion';
import { useFuncionarios } from '@/hooks/pages/useFuncionarios';
import { useGrupos } from '@/hooks/pages/useGrupos';
import { MessagesResource } from '@/i18n/resources';

const Funcionarios = () => {
  const { t } = useTranslation();
  const [openGroup, setOpenGroup] = useState(false);
  const [openEmployee, setOpenEmployee] = useState(false);

  const { createGrupo, grupos, gruposError, isCreatingGrupo, isLoadingGrupos } =
    useGrupos();
  const { createFuncionario, isCreatingFuncionario } = useFuncionarios('');

  const RenderGrupos = useMemo(
    () => () => {
      if (!grupos?.length) return null;

      return (
        <Accordion type="multiple" className="w-full">
          {grupos.map((grupo) => (
            <GrupoAccordionItem key={grupo.ID} grupo={grupo} />
          ))}
        </Accordion>
      );
    },
    [grupos],
  );

  return (
    <>
      <PageHeader title={MessagesResource.SAVE}>
        <CreateEmployeeDialog
          open={openEmployee}
          onOpenChange={setOpenEmployee}
          onSubmit={createFuncionario}
          isPending={isCreatingFuncionario}
        />
        <CreateGroupDialog
          open={openGroup}
          onOpenChange={setOpenGroup}
          onSubmit={createGrupo}
          isPending={isCreatingGrupo}
        />
      </PageHeader>
      <LoadingMessage isLoading={isLoadingGrupos} error={gruposError} />
      <RenderGrupos />
    </>
  );
};

export default Funcionarios;
