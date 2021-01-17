import React, { useState } from "react";

export const Modes = {
  dark: "dark",
  light: "light",
};

const defaultState = {
  mode: Modes.light,
  toggleMode: () => {},
};

export const ThemeContext = React.createContext(defaultState);

export const ThemeContextProvider = ({ children }) => {
  const defaultMode =
    window && window.matchMedia("(prefers-color-scheme: dark)").matches === true
      ? Modes.dark
      : defaultState.mode;

  const [mode, setMode] = useState(defaultMode);
  const toggleMode = () =>
    setMode(mode === Modes.light ? Modes.dark : Modes.light);

  return (
    <ThemeContext.Provider
      value={{
        mode,
        toggleMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
