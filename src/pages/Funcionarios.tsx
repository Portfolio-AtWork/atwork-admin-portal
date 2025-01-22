import React from "react";
import { Accordion } from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";
import { GrupoAccordionItem } from "@/components/pages/funcionarios/GrupoAccordionItem";
import { CreateGroupDialog } from "@/components/pages/funcionarios/CreateGroupDialog";
import { useFuncionarios } from "@/hooks/pages/useFuncionarios";

interface Grupo {
  Nome: string;
  ID: string;
}

const Funcionarios = () => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);

  const { createGrupo, grupos, gruposError, isCreatingGrupo, isLoadingGrupos } = useFuncionarios()

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t('employeeGroups')}</h2>
        <CreateGroupDialog
          open={open}
          onOpenChange={setOpen}
          onSubmit={createGrupo}
          isPending={isCreatingGrupo}
        />
      </div>
      
      {isLoadingGrupos && <p>{t('loadingGroups')}</p>}
      {gruposError && <p className="text-red-500">{t('errorLoadingGroups')}</p>}
      
      {grupos && (
        <Accordion type="single" collapsible className="w-full">
          {grupos.map((grupo: Grupo) => (
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