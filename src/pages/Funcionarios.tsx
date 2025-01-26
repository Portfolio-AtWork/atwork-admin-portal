import React from 'react';
import { Accordion } from '@/components/ui/accordion';
import { useTranslation } from 'react-i18next';
import { GrupoAccordionItem } from '@/components/pages/funcionarios/GrupoAccordionItem';
import { CreateGroupDialog } from '@/components/pages/funcionarios/CreateGroupDialog';
import { CreateEmployeeDialog } from '@/components/pages/funcionarios/CreateEmployeeDialog';
import { useGrupos } from '@/hooks/pages/useGrupos';
import { useFuncionarios } from '@/hooks/pages/useFuncionarios';
import { PageHeader } from '@/components/layout/PageHeader';
import { LoadingMessage } from '@/components/LoadingMessage';

const Funcionarios = () => {
  const { t } = useTranslation();
  const [openGroup, setOpenGroup] = React.useState(false);
  const [openEmployee, setOpenEmployee] = React.useState(false);

  const { createGrupo, grupos, gruposError, isCreatingGrupo, isLoadingGrupos } =
    useGrupos();
  const { createFuncionario, isCreatingFuncionario } = useFuncionarios('');

  return (
    <>
      <PageHeader title={t('employeeGroups')}>
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
      <LoadingMessage
        isLoading={isLoadingGrupos}
        loadingMessage={t('loadingGroups')}
        error={gruposError}
        errorMessage={t('errorLoadingGroups')}
      />
      {grupos && (
        <Accordion type="multiple" className="w-full">
          {grupos.map((grupo) => (
            <GrupoAccordionItem key={grupo.ID} grupo={grupo} />
          ))}
        </Accordion>
      )}
    </>
  );
};

export default Funcionarios;
