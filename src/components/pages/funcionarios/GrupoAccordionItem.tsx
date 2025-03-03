import { CheckedState } from '@radix-ui/react-checkbox';
import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';

import { FuncionariosTable } from './FuncionariosTable';

import { LoadingMessage } from '@/components/LoadingMessage';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { useFuncionariosByGrupo } from '@/hooks/api/funcionario/useGetFuncionariosByGrupo';

interface Grupo {
  Nome: string;
  ID: string;
}

interface GrupoAccordionItemProps {
  grupo: Grupo;
  selected: string[];
  setSelected: Dispatch<SetStateAction<string[]>>;
}

export const GrupoAccordionItem = ({
  grupo,
  selected,
  setSelected,
}: GrupoAccordionItemProps) => {
  const fetchFunc = useFuncionariosByGrupo(grupo.ID);

  const checked = useMemo(
    () => selected.includes(grupo.ID),
    [grupo.ID, selected],
  );

  const onCheckBoxChange = useCallback(
    (event: CheckedState) => {
      if (event.valueOf()) {
        setSelected((old) => [...old, grupo.ID]);
      } else {
        setSelected((old) => old.filter((item) => item !== grupo.ID));
      }
    },
    [grupo.ID, setSelected],
  );

  return (
    <AccordionItem value={grupo.ID} className="rounded-md mb-2">
      <div className="flex items-center gap-2 px-4">
        <Checkbox checked={checked} onCheckedChange={onCheckBoxChange} />
        <AccordionTrigger>{grupo.Nome}</AccordionTrigger>
      </div>
      <AccordionContent className="px-4">
        <LoadingMessage
          isLoading={fetchFunc.isLoading}
          error={fetchFunc.error}
        />
        <FuncionariosTable funcionarios={fetchFunc.data} />
      </AccordionContent>
    </AccordionItem>
  );
};
