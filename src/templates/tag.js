import React from "react";
import { graphql } from "gatsby";
import { Box, Heading } from "rebass";
import { kebabCase } from "lodash";

import Layout from "../components/layout";
import PostLink from "../blocks/PostLink";
import { Helmet } from "react-helmet";
import Container from "../components/container";

const Template = ({ data, pageContext }) => {
  const { site, posts } = data;
  const { tag } = pageContext;

  const pageTitle = `Posts tagged with "${tag}" - ${site.siteMetadata.title}`;
  const pageUrl = `${site.siteMetadata.siteUrl}/tags/${kebabCase(tag)}`;

  return (
    <Layout>
      <Helmet>
        <html lang="en" />
        <meta charSet="utf-8" />
        <title>{pageTitle}</title>
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
      </Helmet>
      <Container mb={3}>
        <Heading>Blog posts tagged with "{tag}"</Heading>
        {posts.edges.map(({ node }) => (
          <Box mt={3}>
            <PostLink key={node.id} post={node} />
          </Box>
        ))}
      </Container>
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
