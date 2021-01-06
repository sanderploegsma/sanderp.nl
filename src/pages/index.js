import React from "react";
import styled from "styled-components";
import { graphql, Link } from "gatsby";

const Container = styled.div`
  margin: 3rem auto;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PostLink = styled(Link)`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  padding: 1rem;
  background-color: #ddd;
`;

const Post = ({ post }) => (
  <PostLink to={post.frontmatter.slug || post.slug}>
    <p>{post.frontmatter.title}</p>
    <p>{post.frontmatter.date}</p>
  </PostLink>
);

const IndexPage = ({ data }) => {
  const {
    allMdx: { edges },
  } = data;

  return (
    <Container>
      {edges.map(({ node }) => (
        <Post key={node.id} post={node} />
      ))}
    </Container>
  );
};

export const query = graphql`
  query IndexPageQuery {
    allMdx(sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000) {
      edges {
        node {
          id
          slug
          frontmatter {
            title
            date
            slug
          }
        }
      }
    }
  }
`;

export default IndexPage;
