import "./layout.css";
import React, { useState } from "react";
import { Link } from "gatsby";
import { grommet } from "grommet/themes";
import { Anchor, Button, Box, Grommet, Nav, Text } from "grommet";
import { Github, Linkedin, Sun, Moon } from "grommet-icons";

const Layout = ({ children }) => {
  const [mode, setMode] = useState("light");
  return (
    <Grommet full theme={grommet} themeMode={mode}>
      <Box
        as="header"
        direction="row"
        align="center"
        justify="between"
        elevation="small"
        pad={{ horizontal: "medium", vertical: "small" }}
        background={{ dark: "dark-1", light: "light-1" }}
      >
        <Anchor label="Sander Ploegsma" as={Link} to="/" />
        <Nav direction="row">
          <Anchor icon={<Github />} href="https://github.com/sanderploegsma" />
          <Anchor
            icon={<Linkedin />}
            href="https://linkedin.com/in/sanderploegsma"
          />
          <Anchor
            icon={mode === "light" ? <Moon /> : <Sun />}
            as={Button}
            onClick={(e) => {
              setMode(mode === "light" ? "dark" : "light");
            }}
          />
        </Nav>
      </Box>
      <Box as="main" pad="small">
        {children}
      </Box>
      <Box
        as="footer"
        direction="row"
        justify="between"
        align="center"
        margin={{ top: "medium" }}
        pad={{ horizontal: "medium", vertical: "small" }}
      >
        <Text>Copyright © {new Date().getFullYear()}</Text>
        <Nav direction="row">
          <Anchor
            icon={<Github />}
            label="Source code"
            href="https://github.com/sanderploegsma/sanderp.nl"
          />
        </Nav>
      </Box>
    </Grommet>
  );
};

export default Layout;
