/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import { graphql } from "gatsby";
import { kebabCase } from "lodash";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Helmet } from "react-helmet";

import Comments from "../comments";
import Container from "../container";
import FormattedDate from "../date";
import Layout from "../layout";
import Link from "../link";

const Template = ({ data }) => {
  const { site, post, nextPost, previousPost } = data;

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
        <div
          sx={{
            mt: [4, 4, 5],
            mb: [2, 2, 3],
            display: "flex",
            justifyContent: previousPost ? "space-between" : "flex-end",
          }}
        >
          {previousPost && (
            <div>
              <Link
                href={"/" + previousPost.frontmatter.slug || previousPost.slug}
              >
                &larr; Newer post
              </Link>
              <br />
              <span sx={{ color: "primary" }}>
                {previousPost.frontmatter.title}
              </span>
            </div>
          )}
          {nextPost && (
            <div sx={{ textAlign: "right" }}>
              <Link href={"/" + nextPost.frontmatter.slug || nextPost.slug}>
                Older post &rarr;
              </Link>
              <br />
              <span sx={{ color: "primary" }}>
                {nextPost.frontmatter.title}
              </span>
            </div>
          )}
        </div>
        <Comments sx={{ mt: 4 }} />
      </Container>
    </Layout>
  );
};

export const pageQuery = graphql`
  fragment PostPagination on Mdx {
    frontmatter {
      title
      slug
    }
    slug
  }

  query($id: String!, $nextPostId: String, $previousPostId: String) {
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
    nextPost: mdx(id: { eq: $nextPostId }) {
      ...PostPagination
    }
    previousPost: mdx(id: { eq: $previousPostId }) {
      ...PostPagination
    }
  }
`;

export default Template;
