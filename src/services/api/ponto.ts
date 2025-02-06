import { api } from '@/lib/api';

export async function getPontosByFuncionario(id: string) {
  const response = await api.get(`/ponto/funcionario/${id}`);
  return response.data;
}