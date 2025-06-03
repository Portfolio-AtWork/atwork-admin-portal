export interface GetPontoByFuncionarioRequest {
  ID_Funcionario: string;
  DT_Ponto?: string;
}
export interface GetPontoByFuncionarioResult {
  ID: string;
  ID_Funcionario: string;
  DT_Ponto: Date;
  ST_Ponto: string;
  TP_Ponto: string;
}

export interface ApprovePontoCommand {
  ID_Funcionario: string;
  ID_Ponto: string;
}

export interface CancelPontoCommand {
  ID_Funcionario: string;
  ID_Ponto: string;
}
