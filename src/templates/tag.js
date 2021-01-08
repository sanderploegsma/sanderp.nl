import React from "react";
import { graphql } from "gatsby";
import { Box, Heading } from "grommet";

import Layout from "../components/layout";
import PostLink from "../blocks/PostLink";

const Template = ({ data, pageContext }) => {
  const {
    allMdx: { edges },
  } = data;

  const { tag } = pageContext;

  return (
    <Layout>
      <Box
        direction="column"
        gap="medium"
        pad={{ horizontal: "xlarge", vertical: "medium" }}
      >
        <Heading size="medium" level={3}>
          Blog posts tagged with "{tag}"
        </Heading>
        {edges.map(({ node }) => (
          <PostLink key={node.id} post={node} />
        ))}
      </Box>
    </Layout>
  );
};

export const pageQuery = graphql`
  query TagPageQuery($tag: String!) {
    allMdx(
      limit: 1000
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          id
          ...PostLink
        }
      }
    }
  }
`;

export default Template;
