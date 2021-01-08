import React from "react";
import { graphql, Link } from "gatsby";
import { kebabCase } from "lodash";
import { Anchor, Box, Heading, Text } from "grommet";
import { MDXRenderer } from "gatsby-plugin-mdx";

import Layout from "../components/layout";
import FormattedDate from "../components/date";

const Template = ({ data }) => {
  const {
    mdx: { frontmatter, body },
  } = data;

  return (
    <Layout>
      <Box pad={{ horizontal: "xlarge", vertical: "medium" }}>
        <Heading size="medium" level={1} margin={{ bottom: "small" }}>
          {frontmatter.title}
        </Heading>

        <Text color="dark-3">
          Published <FormattedDate date={frontmatter.date} />
        </Text>
        {frontmatter.tags && (
          <Box
            direction="row-responsive"
            gap="small"
            justify="start"
            margin={{ top: "small" }}
          >
            <Text color="dark-3">Tags:</Text>
            {frontmatter.tags.map((tag) => (
              <Anchor as={Link} to={`/tags/${kebabCase(tag)}`} label={tag} />
            ))}
          </Box>
        )}
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
        tags
      }
      body
    }
  }
`;

export default Template;
