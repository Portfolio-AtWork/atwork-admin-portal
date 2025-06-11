import { useMutation } from '@tanstack/react-query';

import { approveJustificativa } from '@/services/api/justificativa';
import { ApproveJustificativaCommand } from '@/services/types/justificativa';

async function mutationApproveJustificativa(
  values: ApproveJustificativaCommand,
) {
  const response = await approveJustificativa(values);
  return response.data.value;
}

export function useApproveJustificativa() {
  return useMutation<boolean, Error, ApproveJustificativaCommand>({
    mutationFn: mutationApproveJustificativa,
  });
}
