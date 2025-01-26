import { FuncionariosTable } from './FuncionariosTable';

import { LoadingMessage } from '@/components/LoadingMessage';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useFuncionarios } from '@/hooks/pages/useFuncionarios';

interface Grupo {
  Nome: string;
  ID: string;
}

export const GrupoAccordionItem = ({ grupo }: { grupo: Grupo }) => {
  const { data: funcionarios, isLoading, error } = useFuncionarios(grupo.ID);

  return (
    <AccordionItem value={grupo.ID}>
      <AccordionTrigger>{grupo.Nome}</AccordionTrigger>
      <AccordionContent>
        <LoadingMessage isLoading={isLoading} error={error} />
        <FuncionariosTable funcionarios={funcionarios} />
      </AccordionContent>
    </AccordionItem>
  );
};
