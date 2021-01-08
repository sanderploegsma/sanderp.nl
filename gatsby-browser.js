import "prismjs/themes/prism-okaidia.css";
import React from "react";
import { ThemeContextProvider } from "./src/context/ThemeContext";

export const wrapRootElement = ({ element }) => (
  <ThemeContextProvider>{element}</ThemeContextProvider>
);
