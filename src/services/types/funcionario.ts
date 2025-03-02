export interface GetFuncionariosByGrupoRequest {
  ID: string;
}
export interface GetFuncionariosByGrupoResult {
  ID: string;
  Nome: string;
  Email: string;
  ST_Status: string;
}

export interface CreateFuncionarioCommand {
  Nome: string;
  Login: string;
  Senha: string;
  ConfirmarSenha: string;
  ID_Grupo: string;
  Email: string;
}

export interface CancelFuncionarioCommand {
  ID_Funcionario: string;
}
