import React from "react";
import { useTranslation } from "react-i18next";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FuncionariosTable } from "./FuncionariosTable";
import { useFuncionarios } from "@/hooks/pages/useFuncionarios";

interface Grupo {
  Nome: string;
  ID: string;
}

export const GrupoAccordionItem = ({ grupo }: { grupo: Grupo; }) => {
  const { t } = useTranslation();
  const { data: funcionarios, isLoading, error } = useFuncionarios(grupo.ID);

  return (
    <AccordionItem value={grupo.ID}>
      <AccordionTrigger>{grupo.Nome}</AccordionTrigger>
      <AccordionContent>
        {isLoading && <p>{t('loadingEmployees')}</p>}
        {error && <p className="text-red-500">{t('errorLoadingEmployees')}</p>}
        {funcionarios && <FuncionariosTable funcionarios={funcionarios} />}
      </AccordionContent>
    </AccordionItem>
  );
};