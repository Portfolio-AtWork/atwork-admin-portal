import { useQuery } from '@tanstack/react-query';

import { getJustificativas } from '@/services/api/justificativa';
import {
  GetJustificativasRequest,
  GetJustificativasResult,
} from '@/services/types/justificativa';

export const queryKey = ['justificativas'];

export async function fetchJustificativas(
  queryParams: GetJustificativasRequest,
) {
  const response = await getJustificativas(queryParams);
  return response.data.value;
}

export function useGetJustificativas(queryParams: GetJustificativasRequest) {
  return useQuery<GetJustificativasResult[], Error>({
    queryKey: [...queryKey, queryParams],
    queryFn: () => fetchJustificativas(queryParams),
    enabled: !!queryParams.Mes && !!queryParams.Ano,
  });
}
