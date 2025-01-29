import { useQuery } from '@tanstack/react-query';

import { getGruposByLogin } from '@/services/api/grupo';
import { GetGruposByLoginResult } from '@/services/types/grupo';

async function fetchGruposByLogin() {
  const response = await getGruposByLogin();
  return response.data.value;
}

export function useGetGruposByLogin() {
  return useQuery<GetGruposByLoginResult[], Error>({
    queryKey: ['gruposByLogin'],
    queryFn: fetchGruposByLogin,
  });
}
