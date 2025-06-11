import { AxiosResponse } from 'axios';

import api from '../axios';
import { ObjectResponse } from '../types/base';
import {
  ApproveJustificativaCommand,
  CancelJustificativaCommand,
  GetJustificativasRequest,
  GetJustificativasResult,
} from '../types/justificativa';

const BASE_URL = 'justificativa';

export async function getJustificativas(queryParams: GetJustificativasRequest) {
  return await api.get<
    GetJustificativasRequest,
    AxiosResponse<ObjectResponse<GetJustificativasResult[]>>
  >(`${BASE_URL}/`, {
    params: queryParams,
  });
}

export async function approveJustificativa(
  values: ApproveJustificativaCommand,
) {
  return await api.put<
    ApproveJustificativaCommand,
    AxiosResponse<ObjectResponse<boolean>>
  >(`${BASE_URL}/approveJustificativa`, values);
}

export async function cancelJustificativa(values: CancelJustificativaCommand) {
  return await api.put<
    CancelJustificativaCommand,
    AxiosResponse<ObjectResponse<boolean>>
  >(`${BASE_URL}/cancelJustificativa`, values);
}
