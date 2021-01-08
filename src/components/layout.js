import "./layout.css";
import React, { useContext } from "react";
import { grommet } from "grommet/themes";
import { Box, Grommet } from "grommet";

import Header from "./header";
import Footer from "./footer";
import { ThemeContext } from "../context/ThemeContext";

const Layout = ({ children }) => {
  const { mode } = useContext(ThemeContext);
  return (
    <Grommet full theme={grommet} themeMode={mode}>
      <Header />
      <Box as="main" pad="small">
        {children}
      </Box>
      <Footer />
    </Grommet>
  );
};

export default Layout;
