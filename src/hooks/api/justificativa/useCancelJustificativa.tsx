import { useMutation } from '@tanstack/react-query';

import { cancelJustificativa } from '@/services/api/justificativa';
import { CancelJustificativaCommand } from '@/services/types/justificativa';

async function mutationCancelJustificativa(values: CancelJustificativaCommand) {
  const response = await cancelJustificativa(values);
  return response.data.value;
}

export function useCancelJustificativa() {
  return useMutation<boolean, Error, CancelJustificativaCommand>({
    mutationFn: mutationCancelJustificativa,
  });
}
