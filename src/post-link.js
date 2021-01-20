/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import { graphql } from "gatsby";

import { formatDate } from "./date";
import Link from "./link";
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
  <div>
    <Styled.p sx={{ variant: "text.emphasis.low", marginBlockEnd: 0 }}>
      {formatDate(post.frontmatter.date)} &mdash; {post.timeToRead} min read
    </Styled.p>
    <Styled.h2 sx={{ color: "primary", mt: 0 }}>
      <Link href={postRoute(post)}>{post.frontmatter.title}</Link>
    </Styled.h2>
    <Styled.p sx={{ variant: "text.emphasis.high" }}>
      {post.frontmatter.description || post.excerpt}
    </Styled.p>
    <Link href={postRoute(post)}>Read more...</Link>
    <Styled.hr sx={{ mt: 4, mb: 4 }} />
  </div>
);
