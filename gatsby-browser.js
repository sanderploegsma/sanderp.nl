import "prismjs/themes/prism-okaidia.css";

import React from "react";

import { ThemeProvider, GlobalStyles } from "./src/theme";

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>
    {element}
    <GlobalStyles />
  </ThemeProvider>
);
