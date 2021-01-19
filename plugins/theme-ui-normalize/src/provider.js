import React from "react";
import Normalize from "./normalize.js";

const Root = ({ children }) => (
  <>
    <Normalize />
    {children}
  </>
);

export const wrapRootElement = ({ element }) => <Root>{element}</Root>;
