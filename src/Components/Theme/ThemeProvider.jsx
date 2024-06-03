// ThemeProvider.js
import React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import theme from "./Theme";

const ThemeProvider = ({ children }) => {
  return (
    <CssVarsProvider
      theme={theme}
      defaultMode="system"
      disableTransitionOnChange
    >
      {children}
    </CssVarsProvider>
  );
};

export default ThemeProvider;
