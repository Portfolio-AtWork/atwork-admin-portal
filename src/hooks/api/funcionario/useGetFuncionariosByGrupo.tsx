import { useQuery } from '@tanstack/react-query';

import { getFuncionariosByGrupo } from '@/services/api/funcionario';
import { GetFuncionariosByGrupoResult } from '@/services/types/funcionario';

async function fetchFuncionariosByGrupo(ID_Grupo: string) {
  const response = await getFuncionariosByGrupo(ID_Grupo);
  return response.data.value;
}

export function useFuncionariosByGrupo(ID_Grupo: string) {
  return useQuery<GetFuncionariosByGrupoResult[], Error>({
    queryKey: ['funcionariosByGrupo', ID_Grupo],
    queryFn: () => fetchFuncionariosByGrupo(ID_Grupo),
    enabled: !!ID_Grupo,
  });
}
