import axios from 'axios';

import { getNotificationKind, showNotification } from '@/lib/api';

const TWO_SECONDS = 2 * 1000;
const JWT_TOKEN = localStorage.getItem('token');

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: TWO_SECONDS,
  headers: {
    Authorization: `Bearer ${JWT_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => {
    const hasNotifications = Array.isArray(response?.data?.notifications);

    if (hasNotifications) {
      response.data.notifications.forEach((notification) => {
        const toastType = getNotificationKind(notification.kind);
        showNotification(notification.message, toastType);
      });
    }

    return response;
  },
  (error) => {
    const hasNotifications = Array.isArray(
      error?.response?.data?.notifications,
    );

    if (hasNotifications) {
      error.response.data.notifications.forEach((notification) => {
        const toastType = getNotificationKind(notification.kind);
        showNotification(notification.message, toastType);
      });
    }

    return Promise.reject(error);
  },
);

export default api;
