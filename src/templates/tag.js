/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";

import Container from "../container";
import Layout from "../layout";
import PostLink from "../post-link";
import { tagRoute } from "../routes";

const Template = ({ data, pageContext }) => {
  const { site, posts } = data;
  const { tag } = pageContext;

  const pageTitle = `Posts tagged with "${tag}" - ${site.siteMetadata.title}`;
  const pageUrl = site.siteMetadata.siteUrl + tagRoute(tag);

  return (
    <Layout>
      <Helmet>
        <html lang="en" />
        <meta charSet="utf-8" />
        <title>{pageTitle}</title>
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
      </Helmet>
      <section>
        <Container sx={{ variant: "container.content" }}>
          <Styled.h2>Blog posts tagged with "{tag}"</Styled.h2>
          {posts.edges.map(({ node }) => (
            <PostLink key={node.id} post={node} />
          ))}
        </Container>
      </section>
    </Layout>
  );
};

export const pageQuery = graphql`
  query TagPageQuery($tag: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    posts: allMdx(
      limit: 1000
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          id
          ...PostLink
        }
      }
    }
  }
`;

export default Template;
