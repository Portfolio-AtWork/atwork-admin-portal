import { useQuery } from '@tanstack/react-query';

import { getPontosByFuncionario } from '@/services/api/ponto';
import {
  GetPontoByFuncionarioRequest,
  GetPontoByFuncionarioResult,
} from '@/services/types/ponto';

export const queryKey = ['pontosByFuncionarios'];

export async function fetchPontos(queryParams: GetPontoByFuncionarioRequest) {
  const response = await getPontosByFuncionario(queryParams);
  return response.data.value;
}

export function useGetPontosByFuncionario(
  queryParams: GetPontoByFuncionarioRequest,
) {
  return useQuery<GetPontoByFuncionarioResult[], Error>({
    queryKey: [...queryKey, queryParams],
    queryFn: () => fetchPontos(queryParams),
    enabled: !!queryParams.DT_Ponto && !!queryParams.ID_Funcionario,
  });
}
