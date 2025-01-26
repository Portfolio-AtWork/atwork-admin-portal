import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

import type { ThemeProviderProps as NextThemeProviderProps } from "next-themes";

type ThemeProviderProps = {
  children: React.ReactNode;
  attribute?: NextThemeProviderProps['attribute'];
  defaultTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
};

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}