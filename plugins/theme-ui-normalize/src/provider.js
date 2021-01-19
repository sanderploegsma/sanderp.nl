import React from "react";
import { Global, css } from "@emotion/core";
import normalize from "./normalize";

const Root = ({ children }) => (
  <>
    <Global
      styles={css`
        ${normalize}
      `}
    />
    {children}
  </>
);

export const wrapRootElement = ({ element }) => <Root>{element}</Root>;
