import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';
import api from '@/config/api';

interface CreateGrupoRequest {
  Nome: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface GetGrupoRequest {}

interface GetGrupoResult {
  ID: string;
  Nome: string;
}

const getGrupos = async () => {
  const response = await api.get<GetGrupoRequest, GetGrupoResult[]>(
    'grupo/getGruposByLogin',
  );

  if (!response.ok) {
    throw new Error('Erro ao buscar grupos');
  }

  return response.value;
};

const criarGrupo = async (nome: string): Promise<boolean> => {
  const response = await api.post<CreateGrupoRequest, boolean>(
    'grupo/createGrupo',
    { Nome: nome },
  );

  if (!response.ok) {
    throw new Error('Erro ao criar grupo');
  }

  return response.value;
};

export function useGrupos() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: grupos,
    isLoading: isLoadingGrupos,
    error: gruposError,
  } = useQuery({
    queryKey: ['grupos'],
    queryFn: getGrupos,
  });

  const createGrupoMutation = useMutation({
    mutationFn: (data: CreateGrupoRequest) => criarGrupo(data.Nome),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['grupos'] });
      toast({
        title: t('groupCreated'),
        description: t('groupCreatedSuccess'),
      });
    },
    onError: () => {
      toast({
        title: t('error'),
        description: t('groupCreationError'),
        variant: 'destructive',
      });
    },
  });

  return {
    grupos,
    isLoadingGrupos,
    gruposError,
    createGrupo: createGrupoMutation.mutate,
    isCreatingGrupo: createGrupoMutation.isPending,
  };
}
