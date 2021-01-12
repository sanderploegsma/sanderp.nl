import React from "react";
import { graphql, Link } from "gatsby";
import { kebabCase } from "lodash";
import { Anchor, Box, Heading, Text } from "grommet";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Helmet } from "react-helmet";

import Layout from "../components/layout";
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
      <Box pad={{ horizontal: "xlarge", vertical: "medium" }}>
        <Heading size="medium" level={1} margin={{ bottom: "small" }}>
          {post.frontmatter.title}
        </Heading>

        <Text color="dark-3">
          Published <FormattedDate date={post.frontmatter.date} />
        </Text>
        {post.frontmatter.tags && (
          <Box
            direction="row-responsive"
            gap="small"
            justify="start"
            margin={{ top: "small" }}
          >
            <Text color="dark-3">Tags:</Text>
            {post.frontmatter.tags.map((tag) => (
              <Anchor
                as={Link}
                to={`/tags/${kebabCase(tag)}`}
                label={tag}
                key={kebabCase(tag)}
              />
            ))}
          </Box>
        )}
        <MDXRenderer>{post.body}</MDXRenderer>
      </Box>
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
