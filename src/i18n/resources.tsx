import { createProxyHandler } from './createProxyHandler';
import labels from './locales/pt.json';
import { StringWithOptionalParams } from './types';

type MessagesKeys = keyof typeof labels.translation;

export const MessagesResource = new Proxy(
  {} as Record<MessagesKeys, StringWithOptionalParams>,
  createProxyHandler(labels.translation),
);
