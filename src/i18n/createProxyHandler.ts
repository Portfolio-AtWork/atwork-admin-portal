import { StringWithOptionalParams } from './types';
import { useTranslation } from 'react-i18next';

export type ResourceHandler<
  TKeys extends keyof Record<string, StringWithOptionalParams>,
> = ProxyHandler<Record<TKeys, StringWithOptionalParams>>;

function set<TKeys>(_: any, key: TKeys): boolean {
  throw new Error(`Can not assign value to a read-only property ${key}`);
}

export function createProxyHandler<TKeys extends string>(
  baseJSON: Record<string, string>,
): ResourceHandler<TKeys> {
  const proxyHandler: ResourceHandler<TKeys> = {
    get: (_: any, key: TKeys) => {
      const { t } = useTranslation();

      const hasKey = key in baseJSON;

      if (!hasKey) return key;

      const baseString = t(key);
      const result = new String(baseString) as StringWithOptionalParams;

      function withParameters(params: Record<string, any>): string {
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
