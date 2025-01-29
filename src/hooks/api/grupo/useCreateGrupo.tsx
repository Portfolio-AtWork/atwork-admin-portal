import { useMutation } from '@tanstack/react-query';

import { createGrupo } from '@/services/api/grupo';
import { CreateGrupoCommand } from '@/services/types/grupo';

async function mutationCreateGrupo(values: CreateGrupoCommand) {
  const response = await createGrupo(values);
  return response.data.value;
}

export function useCreateGrupo() {
  return useMutation<boolean, Error, CreateGrupoCommand>({
    mutationFn: mutationCreateGrupo,
  });
}
