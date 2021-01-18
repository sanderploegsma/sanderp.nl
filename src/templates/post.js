/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import { graphql } from "gatsby";
import { kebabCase } from "lodash";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Helmet } from "react-helmet";

import Container from "../container";
import FormattedDate from "../date";
import Layout from "../layout";
import Link from "../link";

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
      <Container>
        <Styled.h2 sx={{ mb: 0 }}>{post.frontmatter.title}</Styled.h2>
        <Styled.p sx={{ marginBlockStart: 0, color: "primary" }}>
          Published <FormattedDate date={post.frontmatter.date} />
        </Styled.p>
        {post.frontmatter.tags && (
          <div>
            <Styled.p>
              Tags:
              <Styled.ul
                sx={{ listStyle: "none", display: "inline-block", p: 0, m: 0 }}
              >
                {post.frontmatter.tags.map((tag) => (
                  <Styled.li
                    sx={{ display: "inline-block", ml: 2 }}
                    key={kebabCase(tag)}
                  >
                    <Link href={`/tags/${kebabCase(tag)}`}>{tag}</Link>
                  </Styled.li>
                ))}
              </Styled.ul>
            </Styled.p>
          </div>
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
