import { useMutation } from '@tanstack/react-query';

import { createFuncionario } from '@/services/api/funcionario';
import { CreateFuncionarioCommand } from '@/services/types/funcionario';

async function mutationCreateFuncionario(values: CreateFuncionarioCommand) {
  const response = await createFuncionario(values);
  return response.data.value;
}

export function useCreateFuncionario() {
  return useMutation<boolean, Error, CreateFuncionarioCommand>({
    mutationFn: mutationCreateFuncionario,
  });
}
