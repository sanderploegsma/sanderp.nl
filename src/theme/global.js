import React from "react";
import { useTheme, Global, css } from "@emotion/react";

export const GlobalStyles = () => {
  const theme = useTheme();

  return (
    <Global
      styles={css`
        body {
          color: ${theme.colors.text};
          background-color: ${theme.colors.bg};
        }
      `}
    />
  );
};
