/** @jsx jsx */
import { jsx, Styled, useColorMode } from "theme-ui";
import { Disqus } from "gatsby-plugin-disqus";

export default ({ identifier, url, title, ...props }) => {
  const [colorMode] = useColorMode();

  return (
    <Styled.div {...props}>
      <Disqus
        colorMode={colorMode}
        config={{
          identifier: slug,
          url: pageUrl,
          title: post.frontmatter.title,
        }}
      />
    </Styled.div>
  );
};
