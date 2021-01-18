/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { jsx, useColorMode, Styled } from "theme-ui";
import { graphql, useStaticQuery } from "gatsby";
import {
  IoSunnySharp,
  IoMoonSharp,
  IoLogoGithub,
  IoLogoLinkedin,
} from "react-icons/io5";

import Link from "./link";

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
        fontSize: [4, 4, 5],
        border: "none",
        background: "none",
        cursor: "pointer",
        color: "text",
      }}
      onClick={toggle}
    >
      <Icon />
    </button>
  );
};

const IconLink = ({ icon, href }) => (
  <Link
    sx={{
      ml: [3, 3, 4],
      fontSize: [4, 4, 5],
    }}
    href={href}
  >
    {icon}
  </Link>
);

const Header = ({ social }) => (
  <div
    sx={{
      p: [2, 2, 3],
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      bg: "highlight",
    }}
  >
    <Styled.h3>
      <Link href="/">Sander Ploegsma</Link>
    </Styled.h3>
    <div
      sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}
    >
      {social.github && (
        <IconLink href={social.github} icon={<IoLogoGithub />} />
      )}
      {social.linkedin && (
        <IconLink href={social.linkedin} icon={<IoLogoLinkedin />} />
      )}
      <ThemeToggle />
    </div>
  </div>
);

const Footer = ({ sourceUrl }) => (
  <div
    sx={{
      p: [2, 2, 3],
      pb: [1, 1, 2],
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <p>Copyright © {new Date().getFullYear()}</p>
    {sourceUrl && (
      <Link href={sourceUrl} sx={{ textDecoration: "none" }}>
        Source code on <IoLogoGithub />
      </Link>
    )}
  </div>
);

export default ({ children }) => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      site {
        siteMetadata {
          sourceUrl
          social {
            github
            linkedin
          }
        }
      }
    }
  `);

  return (
    <>
      <Header {...data.site.siteMetadata} />
      <main sx={{ p: [2, 2, 3] }}>{children}</main>
      <Footer {...data.site.siteMetadata} />
    </>
  );
};
