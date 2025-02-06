import { AxiosResponse } from 'axios';

import api from '../axios';
import { ObjectResponse } from '../types/base';
import {
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
