import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';
import api from '@/config/api';
import { NovoFuncionarioForm } from '@/components/pages/funcionarios/forms/createEmployee/CreateEmployeeTypes';

export interface FuncionariosByGrupoRequest {
  ID_Grupo: string;
}

export interface FuncionariosByGrupoResult {
  ID: string;
  Nome: string;
  ST_Status: string;
  Email: string;
}

const getFuncionariosByGrupo = async (idGrupo: string) => {
  const response = await api.get<FuncionariosByGrupoRequest, FuncionariosByGrupoResult[]>(
    'funcionario/getFuncionariosByGrupo',
    { ID_Grupo: idGrupo }
  );

  if (!response.ok) {
    throw new Error('Erro ao buscar funcionários do grupo');
  }

  return response.value;
};

const createFuncionario = async (data: NovoFuncionarioForm): Promise<boolean> => {
  const response = await api.post<NovoFuncionarioForm, boolean>(
    'funcionario/createFuncionario',
    data
  );

  if (!response.ok) {
    throw new Error('Erro ao criar funcionário');
  }

  return response.value;
};

export const useFuncionarios = (idGrupo: string) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createFuncionarioMutation = useMutation({
    mutationFn: (data: NovoFuncionarioForm) => createFuncionario(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['funcionarios'] });
      toast({
        title: t('employeeCreated'),
        description: t('employeeCreatedSuccess'),
      });
    },
    onError: () => {
      toast({
        title: t('error'),
        description: t('employeeCreationError'),
        variant: 'destructive',
      });
    },
  });

  const query = useQuery({
    queryKey: ['funcionarios', idGrupo],
    queryFn: () => getFuncionariosByGrupo(idGrupo),
  });

  return {
    ...query,
    createFuncionario: createFuncionarioMutation.mutate,
    isCreatingFuncionario: createFuncionarioMutation.isPending,
  };
};