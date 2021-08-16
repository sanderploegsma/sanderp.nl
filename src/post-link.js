/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import { graphql } from "gatsby";

import Link from "./link";
import Tags from "./tags";
import { formatDate } from "./date";
import { postRoute } from "./routes";

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
  <div sx={{ mb: [4, 4, 5] }}>
    <Styled.p
      sx={{
        variant: "text.emphasis.low",
        marginBlockEnd: 0,
        fontSize: [1, 2, 3],
      }}
    >
      {formatDate(post.frontmatter.date)} &mdash; {post.timeToRead} min read
    </Styled.p>
    <Styled.h2
      sx={{
        mt: 0,
        mb: [1, 2],
      }}
    >
      <Link href={postRoute(post)}>{post.frontmatter.title}</Link>
    </Styled.h2>
    <Styled.p sx={{ variant: "text.emphasis.high", marginBlockStart: [1, 2] }}>
      {post.frontmatter.description || post.excerpt}
    </Styled.p>
    {post.frontmatter.tags && (
      <Tags tags={post.frontmatter.tags} sx={{ mt: 3 }} />
    )}
  </div>
);
