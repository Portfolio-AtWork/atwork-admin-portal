
import { useMutation } from '@tanstack/react-query';

import { deleteGrupos } from '@/services/api/grupo';
import { DeleteGruposCommand } from '@/services/types/grupo';

async function mutationDeleteGrupos(values: DeleteGruposCommand) {
  const response = await deleteGrupos(values);
  return response.data.value;
}

export function useDeleteGrupos() {
  return useMutation<boolean, Error, DeleteGruposCommand>({
    mutationFn: mutationDeleteGrupos,
  });
}
