import React, { FC } from "react";
import { Theme, ThemeProvider as MuiThemeProvider } from "@mui/material";

export interface ThemeProviderProps {
  children?: React.ReactNode;
  theme: Theme;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children, theme }) => (
  <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
);
