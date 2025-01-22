import { useQuery } from "@tanstack/react-query";
import api from "@/config/api";

export interface FuncionariosByGrupoRequest {
    ID_Grupo: string
}

export interface FuncionariosByGrupoResult {
    ID: string;
    Nome: string;
    ST_Status: string;
    Email: string
}

export const useFuncionarios = (idGrupo: string) => {
  return useQuery({
    queryKey: ['funcionarios', idGrupo],
    queryFn: async () => {
      const response = await api.get<FuncionariosByGrupoRequest, FuncionariosByGrupoResult[]>('funcionario/getFuncionariosByGrupo', { ID_Grupo: idGrupo })

      if (!response.ok) {
        throw new Error('Erro ao buscar funcionários do grupo');
      }

      return response.value;
    }
  });
};