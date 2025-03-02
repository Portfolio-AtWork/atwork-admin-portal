import { useMutation } from '@tanstack/react-query';

import { cancelPonto } from '@/services/api/ponto';
import { CancelPontoCommand } from '@/services/types/ponto';

async function mutationCancelPonto(values: CancelPontoCommand) {
  const response = await cancelPonto(values);
  return response.data.value;
}

export function useCancelPonto() {
  return useMutation<boolean, Error, CancelPontoCommand>({
    mutationFn: mutationCancelPonto,
  });
}
