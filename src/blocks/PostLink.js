import React from "react";
import { kebabCase } from "lodash";
import { graphql, Link } from "gatsby";
import {
  Anchor,
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
} from "grommet";

import FormattedDate from "../components/date";

const Post = ({ post }) => (
  <Card background={{ dark: "dark-1", light: "light-1" }}>
    <CardHeader pad="medium">
      <Anchor as={Link} to={`/${post.frontmatter.slug || post.slug}`}>
        {post.frontmatter.title}
      </Anchor>
    </CardHeader>
    <CardBody pad={{ horizontal: "medium" }}>{post.excerpt}</CardBody>
    {post.frontmatter.tags && (
      <CardFooter pad={{ horizontal: "medium", top: "medium" }}>
        <Text size="small">Tags:</Text>
        <Box direction="row-responsive" gap="small" justify="end">
          {post.frontmatter.tags.map((tag) => (
            <Anchor
              size="small"
              as={Link}
              to={`/tags/${kebabCase(tag)}`}
              label={tag}
            />
          ))}
        </Box>
      </CardFooter>
    )}
    <CardFooter pad={{ horizontal: "medium", vertical: "small" }}>
      <Box direction="row" flex justify="between">
        <Text size="small">
          Published <FormattedDate date={post.frontmatter.date} />
        </Text>
        <Text size="small">{post.timeToRead} min read</Text>
      </Box>
    </CardFooter>
  </Card>
);

export const fragment = graphql`
  fragment PostLink on Mdx {
    slug
    timeToRead
    excerpt(pruneLength: 200)
    frontmatter {
      slug
      title
      date
      tags
    }
  }
`;

export default Post;
