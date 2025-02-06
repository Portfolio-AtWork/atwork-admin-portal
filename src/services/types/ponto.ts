export interface GetPontoByFuncionarioRequest {
  ID_Funcionario: string;
}
export interface GetPontoByFuncionarioResult {
  ID: string;
  ID_Funcionario: string;
  DT_Ponto: Date;
  ST_Ponto: string;
}
