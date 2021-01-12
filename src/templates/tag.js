import React from "react";
import { graphql } from "gatsby";
import { Box, Heading } from "grommet";
import { kebabCase } from "lodash";

import Layout from "../components/layout";
import PostLink from "../blocks/PostLink";
import { Helmet } from "react-helmet";

const Template = ({ data, pageContext }) => {
  const { site, posts } = data;
  const { tag } = pageContext;

  const pageTitle = `Posts tagged with "${tag}" - ${site.siteMetadata.title}`;
  const pageUrl = `${site.siteMetadata.siteUrl}/tags/${kebabCase(tag)}`;

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{pageTitle}</title>
        <link rel="canonical" href={pageUrl} />
      </Helmet>
      <Box
        direction="column"
        gap="medium"
        pad={{ horizontal: "xlarge", vertical: "medium" }}
      >
        <Heading size="medium" level={3}>
          Blog posts tagged with "{tag}"
        </Heading>
        {posts.edges.map(({ node }) => (
          <PostLink key={node.id} post={node} />
        ))}
      </Box>
    </Layout>
  );
};

export const pageQuery = graphql`
  query TagPageQuery($tag: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    posts: allMdx(
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
