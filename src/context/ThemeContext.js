import React, { useState } from "react";

const defaultState = {
  mode: "light",
  toggleMode: () => {},
};

export const ThemeContext = React.createContext(defaultState);

export const ThemeContextProvider = ({ children }) => {
  const defaultMode =
    window && window.matchMedia("(prefers-color-scheme: dark)").matches === true
      ? "dark"
      : defaultState.mode;

  const [mode, setMode] = useState(defaultMode);
  const toggleMode = () => setMode(mode === "light" ? "dark" : "light");

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
