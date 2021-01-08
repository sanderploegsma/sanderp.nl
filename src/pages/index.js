import React from "react";
import { graphql } from "gatsby";
import { Box, Heading } from "grommet";

import Layout from "../components/layout";
import PostLink from "../blocks/PostLink";

const IndexPage = ({ data }) => {
  const {
    allMdx: { edges },
  } = data;

  return (
    <Layout>
      <Box
        direction="column"
        gap="medium"
        pad={{ horizontal: "xlarge", vertical: "medium" }}
      >
        <Heading size="medium" level={1}>
          Blog posts
        </Heading>
        {edges.map(({ node }) => (
          <PostLink key={node.id} post={node} />
        ))}
      </Box>
    </Layout>
  );
};

export const query = graphql`
  query IndexPageQuery {
    allMdx(sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000) {
      edges {
        node {
          id
          ...PostLink
        }
      }
    }
  }
`;

export default IndexPage;
