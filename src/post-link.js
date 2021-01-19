/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import { graphql } from "gatsby";

import FormattedDate from "./date";
import Link from "./link";

export const fragment = graphql`
  fragment PostLink on Mdx {
    slug
    timeToRead
    excerpt(pruneLength: 200)
    frontmatter {
      slug
      title
      description
      date
      tags
    }
  }
`;

export default ({ post }) => (
  <div>
    <Styled.p sx={{ marginBlockEnd: 0 }}>
      Published <FormattedDate date={post.frontmatter.date} />
    </Styled.p>
    <Styled.h2 sx={{ color: "primary", mt: 0 }}>
      <Link href={`/${post.frontmatter.slug || post.slug}`}>
        {post.frontmatter.title}
      </Link>
    </Styled.h2>
    <Styled.p>{post.frontmatter.description || post.excerpt}</Styled.p>
    <Link href={`/${post.frontmatter.slug || post.slug}`}>Read more...</Link>
    <Styled.hr sx={{ mt: 4, mb: 4 }} />
  </div>
);
