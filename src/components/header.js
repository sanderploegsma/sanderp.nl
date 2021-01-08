import React, { useContext } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { Anchor, Button, Box, Nav } from "grommet";
import { Github, Linkedin, Sun, Moon } from "grommet-icons";

import { ThemeContext, Modes } from "../context/ThemeContext";

const Header = ({ mode, toggleMode, social }) => (
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
      {social.github && <Anchor icon={<Github />} href={social.github} />}
      {social.linkedin && <Anchor icon={<Linkedin />} href={social.linkedin} />}
      <Anchor
        icon={mode === Modes.light ? <Moon /> : <Sun />}
        as={Button}
        onClick={toggleMode}
      />
    </Nav>
  </Box>
);

export default () => {
  const themeContext = useContext(ThemeContext);
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          social {
            github
            linkedin
          }
        }
      }
    }
  `);

  return <Header {...data.site.siteMetadata} {...themeContext} />;
};
