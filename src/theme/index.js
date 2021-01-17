import React, { useState } from "react";
import { ThemeProvider as BaseThemeProvider } from "@emotion/react";

import lightTheme from "./theme-light";
import darkTheme from "./theme-dark";

export * from "./global";

export const Modes = {
  dark: "dark",
  light: "light",
};

const defaultState = {
  mode: Modes.light,
  toggleMode: () => {},
};

export const ThemeContext = React.createContext(defaultState);

export const ThemeProvider = ({ children }) => {
  const defaultMode =
    window && window.matchMedia("(prefers-color-scheme: dark)").matches === true
      ? Modes.dark
      : defaultState.mode;

  const [mode, setMode] = useState(defaultMode);
  const toggleMode = () =>
    setMode(mode === Modes.light ? Modes.dark : Modes.light);

  const theme = mode === Modes.light ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider
      value={{
        mode,
        toggleMode,
      }}
    >
      <BaseThemeProvider theme={theme}>{children}</BaseThemeProvider>
    </ThemeContext.Provider>
  );
};
