export type StringWithOptionalParams = string & {
  withParameters: (params: Record<string, any>) => string;
};
