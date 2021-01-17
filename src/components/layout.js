import "./layout.css";
import React from "react";
import { Box } from "rebass";

import Header from "./header";
import Footer from "./footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Box as="main" p={2}>
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
