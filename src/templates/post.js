import React from "react";
import { graphql, Link as InternalLink } from "gatsby";
import { kebabCase } from "lodash";
import { Flex, Heading, Link, Text } from "rebass";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Helmet } from "react-helmet";

import Layout from "../components/layout";
import Container from "../components/container";
import FormattedDate from "../components/date";

const Template = ({ data }) => {
  const { site, post } = data;

  const pageTitle = site.siteMetadata.title
    ? `${post.frontmatter.title} - ${site.siteMetadata.title}`
    : post.frontmatter.title;

  const slug = post.frontmatter.slug || post.slug;
  const pageUrl = `${site.siteMetadata.siteUrl}/${slug}`;

  return (
    <Layout>
      <Helmet>
        <html lang="en" />
        <title>{pageTitle}</title>
        <link rel="canonical" href={pageUrl} />
        <meta charSet="utf-8" />
        <meta property="description" content={post.excerpt} />
        <meta property="keywords" content={post.frontmatter.tags.join(", ")} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:type" content="blog" />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={pageUrl} />
      </Helmet>
      <Container mb={3}>
        <Heading>{post.frontmatter.title}</Heading>

        <Text mt={2}>
          Published <FormattedDate date={post.frontmatter.date} />
        </Text>
        {post.frontmatter.tags && (
          <Flex mt={2}>
            <Text>Tags:</Text>
            {post.frontmatter.tags.map((tag) => (
              <Link
                ml={2}
                as={InternalLink}
                to={`/tags/${kebabCase(tag)}`}
                key={kebabCase(tag)}
              >
                {tag}
              </Link>
            ))}
          </Flex>
        )}
        <MDXRenderer>{post.body}</MDXRenderer>
      </Container>
    </Layout>
  );
};

export const pageQuery = graphql`
  query($id: String!) {
    site {
      siteMetadata {
        siteUrl
        title
      }
    }
    post: mdx(id: { eq: $id }) {
      frontmatter {
        title
        date
        tags
        slug
      }
      slug
      body
      excerpt(pruneLength: 200)
    }
  }
`;

export default Template;
