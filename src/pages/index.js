import React from "react";
import { graphql, Link } from "gatsby";
import { Box, Heading, Text } from "grommet";

import Layout from "../components/Layout";
import FormattedDate from "../components/date";

const Post = ({ post }) => (
  <Box direction="column" pad="medium" background="background-back">
    <Heading
      size="medium"
      level={2}
      as={Link}
      to={post.frontmatter.slug || post.slug}
    >
      {post.frontmatter.title}
    </Heading>
    <Box
      direction="row-responsive"
      justify="between"
      pad={{ vertical: "small" }}
    >
      <Text size="small">
        <FormattedDate date={post.frontmatter.date} />
      </Text>
      <Text size="small">{post.timeToRead} minutes read time</Text>
    </Box>
    <Text>{post.excerpt}</Text>
  </Box>
);

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
          <Post key={node.id} post={node} />
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
          slug
          excerpt(pruneLength: 200)
          timeToRead
          frontmatter {
            title
            date
            slug
          }
        }
      }
    }
  }
`;

export default IndexPage;
