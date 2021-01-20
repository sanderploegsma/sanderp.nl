/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";

import AboutMe from "../about-me";
import Container from "../container";
import Layout from "../layout";
import PostLink from "../post-link";

const IndexPage = ({ data }) => {
  const { site, posts } = data;

  const { title, description, siteUrl } = site.siteMetadata;

  return (
    <Layout>
      <Helmet>
        <html lang="en" />
        <meta charSet="utf-8" />
        <title>{title}</title>
        <link rel="canonical" href={siteUrl} />
        <meta property="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
      </Helmet>
      <Container>
        <Styled.h2>About me</Styled.h2>
        <AboutMe />
        <Styled.h2>Blog posts</Styled.h2>
        {posts.edges.map(({ node }) => (
          <PostLink key={node.id} post={node} />
        ))}
      </Container>
    </Layout>
  );
};

export const query = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    posts: allMdx(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1000
    ) {
      edges {
        node {
          id
          ...PostLink
        }
      }
    }
  }
`;

export default IndexPage;
