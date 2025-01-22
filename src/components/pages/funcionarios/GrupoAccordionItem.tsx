import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FuncionariosTable } from "./FuncionariosTable";
import { buildApiUrl } from "@/config/api";
import api from "@/config/api";

interface Grupo {
  Nome: string;
  ID: string;
}

const getFuncionariosPorGrupo = async (idGrupo: string) => {
  const response = await fetch(buildApiUrl(`funcionario/getByGrupo?ID_Grupo=${idGrupo}`));
  if (!response.ok) {
    throw new Error('Erro ao buscar funcionários do grupo');
  }
  return response.json();
};

export const GrupoAccordionItem = ({ grupo }: { grupo: Grupo; }) => {
  const { t } = useTranslation();
  const { data: funcionarios, isLoading, error } = useQuery({
    queryKey: ['funcionarios', grupo.ID],
    queryFn: () => getFuncionariosPorGrupo(grupo.ID),
    enabled: false,
  });

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