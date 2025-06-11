import { AxiosResponse } from 'axios';

import api from '../axios';
import { ObjectResponse } from '../types/base';
import {
  ApprovePontoCommand,
  CancelPontoCommand,
  CreatePontoManualCommand,
  GetPontoByFuncionarioRequest,
  GetPontoByFuncionarioResult,
} from '../types/ponto';

const BASE_URL = 'ponto';

export async function getPontosByFuncionario(
  queryParams: GetPontoByFuncionarioRequest,
) {
  return await api.get<
    GetPontoByFuncionarioRequest,
    AxiosResponse<ObjectResponse<GetPontoByFuncionarioResult[]>>
  >(`${BASE_URL}/byFuncionario`, {
    params: queryParams,
  });
}

export async function approvePonto(values: ApprovePontoCommand) {
  return await api.put<
    ApprovePontoCommand,
    AxiosResponse<ObjectResponse<boolean>>
  >(`${BASE_URL}/approvePonto`, values);
}

export async function cancelPonto(values: CancelPontoCommand) {
  return await api.put<
    CancelPontoCommand,
    AxiosResponse<ObjectResponse<boolean>>
  >(`${BASE_URL}/cancelPonto`, values);
}

export async function createPontoManual(values: CreatePontoManualCommand) {
  return api.post<
    CreatePontoManualCommand,
    AxiosResponse<ObjectResponse<boolean>>
  >(`${BASE_URL}/createPontoManual`, values);
}
