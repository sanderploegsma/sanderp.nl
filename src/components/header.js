import React, { useContext } from "react";
import { graphql, Link as InternalLink, useStaticQuery } from "gatsby";
import { Box, Link, Button, Flex } from "rebass";
import { FaGithub, FaLinkedin, FaSun, FaMoon } from "react-icons/fa";

import { ThemeContext, Modes } from "../theme";

const ThemeToggle = ({ mode, toggleMode }) => {
  const Icon = mode === Modes.light ? FaMoon : FaSun;

  return (
    <Button onClick={toggleMode}>
      <Icon />
    </Button>
  );
};

const Header = ({ mode, toggleMode, social }) => (
  <Flex
    as="header"
    p={[2, 2, 3]}
    alignItems="center"
    justifyContent="space-between"
  >
    <Link as={InternalLink} to="/">
      Sander Ploegsma
    </Link>
    <Flex alignItems="center" justifyContent="space-between">
      {social.github && (
        <Link href={social.github}>
          <FaGithub />
        </Link>
      )}
      {social.linkedin && (
        <Link ml={3} href={social.linkedin}>
          <FaLinkedin />
        </Link>
      )}
      <Box ml={3}>
        <ThemeToggle mode={mode} toggleMode={toggleMode} />
      </Box>
    </Flex>
  </Flex>
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
