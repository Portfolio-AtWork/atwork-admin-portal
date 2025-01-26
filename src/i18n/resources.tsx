import labels from './locales/pt.json';
import { createProxyHandler } from './createProxyHandler';
import { StringWithOptionalParams } from './types';

type MessagesKeys = keyof typeof labels.translation;

export const MessagesResource = new Proxy(
  {} as Record<MessagesKeys, StringWithOptionalParams>,
  createProxyHandler(labels.translation),
);
