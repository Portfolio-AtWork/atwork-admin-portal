/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface GetGruposByLoginRequest {}
export interface GetGruposByLoginResult {
  ID: string;
  Nome: string;
}

export interface CreateGrupoCommand {
  Nome: string;
}
