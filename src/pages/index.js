import React from "react";
import { graphql, Link } from "gatsby";
import {
  Anchor,
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
} from "grommet";

import Layout from "../components/Layout";
import FormattedDate from "../components/date";

const Post = ({ post }) => (
  <Card background={{ dark: "dark-1", light: "light-1" }}>
    <CardHeader pad="medium">
      <Anchor as={Link} to={post.frontmatter.slug || post.slug}>
        {post.frontmatter.title}
      </Anchor>
    </CardHeader>
    <CardBody pad={{ horizontal: "medium" }}>{post.excerpt}</CardBody>
    <CardFooter pad={{ horizontal: "medium", top: "medium", bottom: "small" }}>
      <Text size="small">
        <FormattedDate date={post.frontmatter.date} />
      </Text>
      <Text size="small">{post.timeToRead} min read</Text>
    </CardFooter>
  </Card>
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
