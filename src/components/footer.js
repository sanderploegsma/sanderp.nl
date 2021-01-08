import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Anchor, Box, Nav, Text } from "grommet";
import { Github } from "grommet-icons";

const Footer = ({ sourceUrl }) => (
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
      {sourceUrl && (
        <Anchor icon={<Github />} label="Source code" href={sourceUrl} />
      )}
    </Nav>
  </Box>
);

export default () => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      site {
        siteMetadata {
          sourceUrl
        }
      }
    }
  `);

  return <Footer {...data.site.siteMetadata} />;
};
