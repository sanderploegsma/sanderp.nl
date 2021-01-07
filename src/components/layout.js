import "./layout.css";

import React from "react";
import { Anchor, Footer, Grommet, Header, Main, Nav, Text } from "grommet";
import { Github, Linkedin } from "grommet-icons";
import { grommet } from "grommet/themes";
import { Link } from "gatsby";

const Layout = ({ children }) => (
  <Grommet theme={grommet}>
    <Header
      background="light-4"
      pad={{ horizontal: "medium", vertical: "small" }}
    >
      <Anchor label="Sander Ploegsma" as={Link} to="/" />
      <Nav direction="row">
        <Anchor label={<Github />} href="https://github.com/sanderploegsma" />
        <Anchor
          label={<Linkedin />}
          href="https://linkedin.com/in/sanderploegsma"
        />
      </Nav>
    </Header>
    <Main pad="small">{children}</Main>
    <Footer pad={{ horizontal: "medium", vertical: "small" }} justify="between">
      <Text>Copyright © {new Date().getFullYear()}</Text>
      <Nav direction="row">
        <Anchor
          label="Source on Github"
          href="https://github.com/sanderploegsma/sanderp.nl"
        />
      </Nav>
    </Footer>
  </Grommet>
);

export default Layout;
