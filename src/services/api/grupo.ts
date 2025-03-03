import { AxiosResponse } from 'axios';

import api from '../axios';
import { ObjectResponse } from '../types/base';

import {
  CreateGrupoCommand,
  DeleteGruposCommand,
  GetGruposByLoginRequest,
  GetGruposByLoginResult,
} from '@/services/types/grupo';

const BASE_URL = 'grupo';

export function getGruposByLogin() {
  return api.get<
    GetGruposByLoginRequest,
    AxiosResponse<ObjectResponse<GetGruposByLoginResult[]>>
  >(`${BASE_URL}/byLogin`);
}

export function createGrupo(values: CreateGrupoCommand) {
  return api.post<CreateGrupoCommand, AxiosResponse<ObjectResponse<boolean>>>(
    BASE_URL,
    values,
  );
}

export function deleteGrupos(values: DeleteGruposCommand) {
  return api.delete<
    DeleteGruposCommand,
    AxiosResponse<ObjectResponse<boolean>>
  >(`${BASE_URL}/deleteGrupos`, { data: values });
}
