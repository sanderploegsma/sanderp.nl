import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Link, Text, Flex } from "rebass";
import { FaGithub } from "react-icons/fa";

const Footer = ({ sourceUrl }) => (
  <Flex
    as="footer"
    p={[2, 2, 3]}
    alignItems="center"
    justifyContent="space-between"
  >
    <Text>Copyright © {new Date().getFullYear()}</Text>
    {sourceUrl && (
      <Link href={sourceUrl}>
        <FaGithub /> Source code
      </Link>
    )}
  </Flex>
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
