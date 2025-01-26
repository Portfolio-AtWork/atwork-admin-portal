import { useTranslation } from 'react-i18next';

import { StringWithOptionalParams } from './types';

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
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { t } = useTranslation();

      const hasKey = key in baseJSON;

      if (!hasKey) return key;

      const baseString = t(key);
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
