/** @jsx jsx */
import { jsx, Styled, Divider } from "theme-ui";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Helmet } from "react-helmet";

import AboutMe from "../about-me";
import Comments from "../comments";
import Container from "../container";
import Layout from "../layout";
import Link from "../link";
import Tags from "../tags";
import { formatDate } from "../date";
import { postRoute } from "../routes";

const PostStepper = ({ href, postTitle, children, ...props }) => (
  <div {...props}>
    <Link href={href}>{children}</Link>
    <br />
    <span sx={{ color: "primary" }}>{postTitle}</span>
  </div>
);

const PostPagination = ({ newerPost, olderPost }) => (
  <div
    sx={{
      mt: [4, 4, 5],
      mb: [2, 2, 3],
      display: "flex",
      justifyContent: newerPost ? "space-between" : "flex-end",
    }}
  >
    {newerPost && (
      <PostStepper
        href={postRoute(newerPost)}
        postTitle={newerPost.frontmatter.title}
      >
        &larr; Newer post
      </PostStepper>
    )}
    {olderPost && (
      <PostStepper
        href={postRoute(olderPost)}
        postTitle={olderPost.frontmatter.title}
        sx={{ textAlign: "right" }}
      >
        Older post &rarr;
      </PostStepper>
    )}
  </div>
);

const Template = ({ data }) => {
  const { site, post, nextPost, previousPost } = data;

  const pageTitle = site.siteMetadata.title
    ? `${post.frontmatter.title} - ${site.siteMetadata.title}`
    : post.frontmatter.title;

  const slug = postRoute(post);
  const pageUrl = site.siteMetadata.siteUrl + slug;
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
      <section>
        <Container sx={{ variant: "container.content" }}>
          <Styled.p
            sx={{
              variant: "text.emphasis.low",
              marginBlockEnd: 0,
              fontSize: [1, 2, 3],
            }}
          >
            {formatDate(post.frontmatter.date)} &mdash; {post.timeToRead} min
            read
          </Styled.p>
          <Styled.h1 sx={{ mt: 0 }}>{post.frontmatter.title}</Styled.h1>
          {post.frontmatter.tags && (
            <Tags
              tags={post.frontmatter.tags}
              sx={{ mt: [0, "-12px"], mb: 4 }}
            />
          )}
          <MDXRenderer>{post.body}</MDXRenderer>
        </Container>
      </section>
      <section sx={{ mt: [2, 2, 4], py: [2, 2, 3], variant: "section.muted" }}>
        <Container>
          <AboutMe short />
        </Container>
      </section>
      <section>
        <Container>
          <PostPagination newerPost={previousPost} olderPost={nextPost} />
          <Comments
            identifier={slug}
            title={post.frontmatter.title}
            url={pageUrl}
            sx={{ mt: 4 }}
          />
        </Container>
      </section>
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
