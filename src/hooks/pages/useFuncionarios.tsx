import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";
import api from "@/config/api";

export interface FuncionariosByGrupoRequest {
  ID_Grupo: string;
}

export interface FuncionariosByGrupoResult {
  ID: string;
  Nome: string;
  ST_Status: string;
  Email: string;
}

interface CreateFuncionarioRequest {
  Nome: string;
  Login: string;
  Senha: string;
  ConfirmarSenha: string;
  ID_Grupo: string;
  Email: string;
}

export const useFuncionarios = (idGrupo: string) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createFuncionarioMutation = useMutation({
    mutationFn: async (data: CreateFuncionarioRequest) => {
      const response = await api.post<CreateFuncionarioRequest, boolean>(
        'funcionario/createFuncionario',
        data
      );

      if (!response.ok) {
        throw new Error('Erro ao criar funcionário');
      }

      return response.value;
    },
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

  return useQuery({
    queryKey: ['funcionarios', idGrupo],
    queryFn: async () => {
      const response = await api.get<FuncionariosByGrupoRequest, FuncionariosByGrupoResult[]>(
        'funcionario/getFuncionariosByGrupo',
        { ID_Grupo: idGrupo }
      );

      if (!response.ok) {
        throw new Error('Erro ao buscar funcionários do grupo');
      }

      return response.value;
    },
  });
};

export const useCreateFuncionario = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateFuncionarioRequest) => {
      const response = await api.post<CreateFuncionarioRequest, boolean>(
        'funcionario/createFuncionario',
        data
      );

      if (!response.ok) {
        throw new Error('Erro ao criar funcionário');
      }

      return response.value;
    },
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
};