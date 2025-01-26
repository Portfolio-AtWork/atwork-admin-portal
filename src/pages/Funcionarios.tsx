import React from "react";
import { Accordion } from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";
import { GrupoAccordionItem } from "@/components/pages/funcionarios/GrupoAccordionItem";
import { CreateGroupDialog } from "@/components/pages/funcionarios/CreateGroupDialog";
import { CreateEmployeeDialog } from "@/components/pages/funcionarios/CreateEmployeeDialog";
import { useGrupos } from "@/hooks/pages/useGrupos";
import { useFuncionarios } from "@/hooks/pages/useFuncionarios";

const Funcionarios = () => {
  const { t } = useTranslation();
  const [openGroup, setOpenGroup] = React.useState(false);
  const [openEmployee, setOpenEmployee] = React.useState(false);

  const { createGrupo, grupos, gruposError, isCreatingGrupo, isLoadingGrupos } = useGrupos();
  const { createFuncionario, isCreatingFuncionario } = useFuncionarios("");

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t('employeeGroups')}</h2>
        <div className="flex gap-2">
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
        </div>
      </div>
      
      {isLoadingGrupos && <p>{t('loadingGroups')}</p>}
      {gruposError && <p className="text-red-500">{t('errorLoadingGroups')}</p>}
      
      {grupos && (
        <Accordion type="single" collapsible className="w-full">
          {grupos.map((grupo) => (
            <GrupoAccordionItem 
              key={grupo.ID} 
              grupo={grupo} 
            />
          ))}
        </Accordion>
      )}
    </>
  );
};

export default Funcionarios;