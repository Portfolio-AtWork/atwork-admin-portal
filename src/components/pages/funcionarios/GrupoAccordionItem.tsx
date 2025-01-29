import { FuncionariosTable } from './FuncionariosTable';

import { LoadingMessage } from '@/components/LoadingMessage';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useFuncionariosByGrupo } from '@/hooks/api/funcionario/useGetFuncionariosByGrupo';

interface Grupo {
  Nome: string;
  ID: string;
}

export const GrupoAccordionItem = ({ grupo }: { grupo: Grupo }) => {
  const fetchFunc = useFuncionariosByGrupo(grupo.ID);

  return (
    <AccordionItem value={grupo.ID}>
      <AccordionTrigger>{grupo.Nome}</AccordionTrigger>
      <AccordionContent>
        <LoadingMessage
          isLoading={fetchFunc.isLoading}
          error={fetchFunc.error}
        />
        <FuncionariosTable funcionarios={fetchFunc.data} />
      </AccordionContent>
    </AccordionItem>
  );
};
