import { useMutation } from '@tanstack/react-query';

import { createPontoManual } from '@/services/api/ponto';
import { CreatePontoManualCommand } from '@/services/types/ponto';

async function mutationCreatePontoManual(values: CreatePontoManualCommand) {
  const response = await createPontoManual(values);
  return response.data.value;
}

export function useCreatePontoManual() {
  return useMutation<boolean, Error, CreatePontoManualCommand>({
    mutationFn: mutationCreatePontoManual,
  });
}
