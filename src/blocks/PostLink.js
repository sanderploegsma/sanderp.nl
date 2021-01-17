import React from "react";
import { kebabCase } from "lodash";
import { graphql, Link as InternalLink } from "gatsby";
import { Box, Flex, Link, Text } from "rebass";

import FormattedDate from "../components/date";

const Post = ({ post }) => (
  <Box>
    <Link as={InternalLink} to={`/${post.frontmatter.slug || post.slug}`}>
      {post.frontmatter.title}
    </Link>
    <Text mt={2}>{post.excerpt}</Text>
    {post.frontmatter.tags && (
      <Flex mt={2} justifyContent="space-between">
        <Text>Tags:</Text>
        <Flex justifyContent="flex-end">
          {post.frontmatter.tags.map((tag) => (
            <Link ml={2} as={InternalLink} to={`/tags/${kebabCase(tag)}`}>
              {tag}
            </Link>
          ))}
        </Flex>
      </Flex>
    )}
    <Flex mt={1} justifyContent="space-between">
      <Text>
        Published <FormattedDate date={post.frontmatter.date} />
      </Text>
      <Text>{post.timeToRead} min read</Text>
    </Flex>
  </Box>
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
