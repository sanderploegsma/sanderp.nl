import "prismjs/themes/prism-okaidia.css";
import React from "react";
import { ThemeProvider } from "@emotion/react";

import {
  lightTheme,
  darkTheme,
  ThemeContextProvider,
  ThemeContext,
  Modes,
} from "./src/theme";

export const wrapRootElement = ({ element }) => (
  <ThemeContextProvider>
    <ThemeContext.Consumer>
      {({ mode }) => (
        <ThemeProvider theme={mode === Modes.light ? lightTheme : darkTheme}>
          {element}
        </ThemeProvider>
      )}
    </ThemeContext.Consumer>
  </ThemeContextProvider>
);
