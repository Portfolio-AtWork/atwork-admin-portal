import { toast } from 'react-toastify';

const notificationKindsObj = {
  1: 'success', // Success
  2: 'info', // Information
  3: 'warning', // Warning
  4: 'error', // Error
} as const;

type NotificationKinds =
  (typeof notificationKindsObj)[keyof typeof notificationKindsObj];

export function getNotificationKind(kind: number): NotificationKinds {
  return notificationKindsObj[kind] ?? 'info';
}

export function showNotification(message: string, type: NotificationKinds) {
  toast[type](message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}
