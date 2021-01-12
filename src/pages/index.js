import React from "react";
import { graphql } from "gatsby";
import { Box, Heading } from "grommet";
import { Helmet } from "react-helmet";

import Layout from "../components/layout";
import PostLink from "../blocks/PostLink";

const IndexPage = ({ data }) => {
  const { site, posts } = data;

  const pageTitle = site.siteMetadata.title;
  const pageUrl = site.siteMetadata.siteUrl;

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
      <Box
        direction="column"
        gap="medium"
        pad={{ horizontal: "xlarge", vertical: "medium" }}
      >
        <Heading size="medium" level={1}>
          Blog posts
        </Heading>
        {posts.edges.map(({ node }) => (
          <PostLink key={node.id} post={node} />
        ))}
      </Box>
    </Layout>
  );
};

export const query = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    posts: allMdx(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1000
    ) {
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
