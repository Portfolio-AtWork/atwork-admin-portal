import { AxiosResponse } from 'axios';

import api from '../axios';
import { ObjectResponse } from '../types/base';
import {
  CreateFuncionarioCommand,
  GetFuncionariosByGrupoRequest,
  GetFuncionariosByGrupoResult,
} from '../types/funcionario';

const BASE_URL = 'funcionario';

export function getFuncionariosByGrupo(ID_Grupo: string) {
  return api.get<
    GetFuncionariosByGrupoRequest,
    AxiosResponse<ObjectResponse<GetFuncionariosByGrupoResult[]>>
  >(`${BASE_URL}/byGrupo`, { params: { ID_Grupo } });
}

export function createFuncionario(values: CreateFuncionarioCommand) {
  return api.post<
    CreateFuncionarioCommand,
    AxiosResponse<ObjectResponse<boolean>>
  >(BASE_URL, values);
}
