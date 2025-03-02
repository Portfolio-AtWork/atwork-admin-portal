enum NotificationKind {
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

export interface ObjectResponse<T> {
  value: T;
  notifications: Notification[];
  ok: boolean;
}

//export type Guid = `${string}-${string}-${string}-${string}-${string}`;
