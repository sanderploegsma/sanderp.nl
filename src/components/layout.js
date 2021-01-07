import "./layout.css";
import React, { useState } from "react";
import { Link } from "gatsby";
import { grommet } from "grommet/themes";
import {
  Anchor,
  Button,
  Footer,
  Grommet,
  Header,
  Main,
  Nav,
  Text,
} from "grommet";
import { Github, Linkedin, Sun, Moon } from "grommet-icons";

const Layout = ({ children }) => {
  const [mode, setMode] = useState("light");
  return (
    <Grommet full theme={grommet} themeMode={mode}>
      <Header pad={{ horizontal: "medium", vertical: "small" }}>
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
      </Header>
      <Main pad="small">{children}</Main>
      <Footer
        pad={{ horizontal: "medium", vertical: "small" }}
        justify="between"
      >
        <Text>Copyright © {new Date().getFullYear()}</Text>
        <Nav direction="row">
          <Anchor
            icon={<Github />}
            label="Source code"
            href="https://github.com/sanderploegsma/sanderp.nl"
          />
        </Nav>
      </Footer>
    </Grommet>
  );
};

export default Layout;
