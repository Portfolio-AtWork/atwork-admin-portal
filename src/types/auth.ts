export enum NotificationKind {
  Success = 1,
  Information = 2,
  Warning = 3,
  Error = 4,
}

export interface Notification {
  id: string;
  message: string;
  kind: NotificationKind;
  parameters: object;
}

export interface LoginRequest {
  Login: string;
  Senha: string;
  TP_Login: string;
}

export interface LoginResponse {
  token: string;
  login: string;
  notifications: Notification[];
  ok: boolean;
  nome: string;
}