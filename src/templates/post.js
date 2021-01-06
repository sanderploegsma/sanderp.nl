import React from "react";
import styled from "styled-components";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

const Container = styled.div`
  margin: 3rem auto;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Template = ({ data }) => {
  const {
    mdx: { frontmatter, body },
  } = data;

  return (
    <Container>
        <h1>{frontmatter.title}</h1>
        <p>{frontmatter.date}</p>
        <MDXRenderer>{body}</MDXRenderer>
    </Container>
  );
};

export const pageQuery = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date
      }
      body
    }
  }
`;

export default Template;
