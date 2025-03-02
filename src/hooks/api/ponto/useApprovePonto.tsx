import { useMutation } from '@tanstack/react-query';

import { approvePonto } from '@/services/api/ponto';
import { ApprovePontoCommand } from '@/services/types/ponto';

async function mutationApprovePonto(values: ApprovePontoCommand) {
  const response = await approvePonto(values);
  return response.data.value;
}

export function useApprovePonto() {
  return useMutation<boolean, Error, ApprovePontoCommand>({
    mutationFn: mutationApprovePonto,
  });
}
