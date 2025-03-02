import { useMutation } from '@tanstack/react-query';

import { cancelFuncionario } from '@/services/api/funcionario';

async function mutationCancelFuncionario(ID_Funcionario: string) {
  const response = await cancelFuncionario(ID_Funcionario);
  return response.data.value;
}

export function useCancelFuncionario() {
  return useMutation<boolean, Error, string>({
    mutationFn: mutationCancelFuncionario,
  });
}
