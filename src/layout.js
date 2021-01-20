/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { jsx, useColorMode, Styled } from "theme-ui";
import { graphql, useStaticQuery } from "gatsby";
import { IoSunnySharp, IoMoonSharp, IoLogoGithub } from "react-icons/io5";

import Link from "./link";
import Container from "./container";

const ThemeToggle = () => {
  const [colorMode, setColorMode] = useColorMode();

  const Icon = colorMode === "default" ? IoMoonSharp : IoSunnySharp;
  const toggle = () =>
    setColorMode(colorMode === "default" ? "dark" : "default");

  return (
    <button
      sx={{
        p: 0,
        ml: [3, 3, 4],
        fontSize: 4,
        border: "none",
        background: "none",
        cursor: "pointer",
        color: "text",
        "&:hover": {
          color: "secondary",
        },
      }}
      onClick={toggle}
    >
      <Icon />
    </button>
  );
};

const Header = () => (
  <div sx={{ bg: "muted" }}>
    <Container
      sx={{
        // py: [2, 2, 3],
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Styled.h3 sx={{ fontSize: [3, 4] }}>
        <Link href="/">Sander Ploegsma</Link>
      </Styled.h3>
      <div
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <ThemeToggle />
      </div>
    </Container>
  </div>
);

const Footer = ({ sourceUrl }) => (
  <div>
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <p>Copyright © {new Date().getFullYear()}</p>
      <p sx={{ textAlign: "right" }}>
        {sourceUrl && (
          <Link href={sourceUrl} sx={{ textDecoration: "none" }}>
            Source code on <IoLogoGithub />
          </Link>
        )}
      </p>
    </Container>
  </div>
);

export default ({ children }) => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      site {
        siteMetadata {
          sourceUrl
        }
      }
    }
  `);

  return (
    <>
      <Header {...data.site.siteMetadata} />
      <main>{children}</main>
      <Footer {...data.site.siteMetadata} />
    </>
  );
};
