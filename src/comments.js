/** @jsx jsx */
import { jsx, Styled, useColorMode } from "theme-ui";
import { Disqus } from "gatsby-plugin-disqus";

export default ({ identifier, url, title, sx, ...props }) => {
  const [colorMode] = useColorMode();

  return (
    <Styled.div {...props} sx={sx}>
      <Disqus
        colorMode={colorMode}
        config={{
          identifier,
          url,
          title,
        }}
      />
    </Styled.div>
  );
};
