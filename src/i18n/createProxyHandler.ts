import { StringWithOptionalParams } from './types';

import { _t } from '@/contexts/LanguageContext';

export type ResourceHandler<
  TKeys extends keyof Record<string, StringWithOptionalParams>,
> = ProxyHandler<Record<TKeys, StringWithOptionalParams>>;

function set<TKeys>(_: never, key: TKeys): boolean {
  throw new Error(`Can not assign value to a read-only property ${key}`);
}

export function createProxyHandler<TKeys extends string>(
  baseJSON: Record<string, string>,
): ResourceHandler<TKeys> {
  const proxyHandler: ResourceHandler<TKeys> = {
    get: (_: never, key: TKeys) => {
      const hasKey = key in baseJSON;

      if (!hasKey) return key;

      const baseString = _t ? _t(key) : key;
      const result = new String(baseString) as StringWithOptionalParams;

      function withParameters(params: Record<string, never>): string {
        return baseString.replace(
          /\{(.*?)\}/g,
          (_, match) => params[match] || `{${match}}`,
        );
      }

      result.withParameters = withParameters;
      return result;
    },
    set,
  };

  return proxyHandler;
}
