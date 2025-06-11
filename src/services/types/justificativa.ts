export interface ApproveJustificativaCommand {
  ID_Funcionario: string;
  ID_Justificativa: string;
}

export interface CancelJustificativaCommand {
  ID_Funcionario: string;
  ID_Justificativa: string;
}

export interface GetJustificativasRequest {
  ID_Funcionario?: string;
  Mes: number;
  Ano: number;
}

export interface GetJustificativasResult {
  ID_Justificativa: string;
  Justificativa: string;
  ImagemJustificativa: string | null | undefined;
  ST_Justificativa: string;
  DT_Justificativa: Date;
  TemImagemJustificativa: boolean;
  ImagemContentType:
    | 'image/jpeg'
    | 'image/png'
    | 'image/gif'
    | 'image/bmp'
    | 'image/webp'
    | 'image/jpg'
    | undefined;
}
