import React from "react";
import { graphql } from "gatsby";
import { Box, Heading, Text } from "grommet";
import { MDXRenderer } from "gatsby-plugin-mdx";

import Layout from "../components/Layout";
import FormattedDate from "../components/date";

const Template = ({ data }) => {
  const {
    mdx: { frontmatter, body },
  } = data;

  return (
    <Layout>
      <Box pad={{ horizontal: "xlarge", vertical: "medium" }}>
        <Heading size="medium" level={1}>
          {frontmatter.title}
        </Heading>
        <Text>
          <FormattedDate date={frontmatter.date} />
        </Text>
        <MDXRenderer>{body}</MDXRenderer>
      </Box>
    </Layout>
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
