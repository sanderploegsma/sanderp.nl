/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Helmet } from "react-helmet";

import Comments from "../comments";
import Container from "../container";
import Layout from "../layout";
import Link from "../link";
import Tags from "../tags";
import { formatDate } from "../date";
import { postRoute } from "../routes";

const Template = ({ data }) => {
  const { site, post, nextPost, previousPost } = data;

  const pageTitle = site.siteMetadata.title
    ? `${post.frontmatter.title} - ${site.siteMetadata.title}`
    : post.frontmatter.title;

  const pageUrl = site.siteMetadata.siteUrl + postRoute(post);
  const description = post.frontmatter.description || post.excerpt;
  const seoImage =
    post.frontmatter.seo &&
    post.frontmatter.seo.image &&
    site.siteMetadata.siteUrl + post.frontmatter.seo.image.publicURL;

  return (
    <Layout>
      <Helmet>
        <html lang="en" />
        <title>{pageTitle}</title>
        <link rel="canonical" href={pageUrl} />
        <meta charSet="utf-8" />
        <meta property="description" content={description} />
        <meta property="keywords" content={post.frontmatter.tags.join(", ")} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:type" content="blog" />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={seoImage} />
      </Helmet>
      <Container>
        <Styled.p
          sx={{
            variant: "text.emphasis.low",
            marginBlockEnd: 0,
            fontSize: [1, 2, 3],
          }}
        >
          {formatDate(post.frontmatter.date)} &mdash; {post.timeToRead} min read
        </Styled.p>
        <Styled.h1 sx={{ mt: 0 }}>{post.frontmatter.title}</Styled.h1>
        {post.frontmatter.tags && (
          <Tags
            tags={post.frontmatter.tags}
            sx={{ mt: [0, "-12px"], mb: [4, 4, 5] }}
          />
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
              <Link href={postRoute(previousPost)}>&larr; Newer post</Link>
              <br />
              <span sx={{ color: "primary" }}>
                {previousPost.frontmatter.title}
              </span>
            </div>
          )}
          {nextPost && (
            <div sx={{ textAlign: "right" }}>
              <Link href={postRoute(nextPost)}>Older post &rarr;</Link>
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
        description
        date
        tags
        slug
        seo {
          image {
            publicURL
          }
        }
      }
      slug
      body
      timeToRead
      excerpt(pruneLength: 200)
    }
    nextPost: mdx(id: { eq: $nextPostId }) {
      ...PostLink
    }
    previousPost: mdx(id: { eq: $previousPostId }) {
      ...PostLink
    }
  }
`;

export default Template;
