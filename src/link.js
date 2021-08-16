/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import { Link as GatsbyLink } from "gatsby";
import isAbsoluteURL from "is-absolute-url";

const isHash = (str) => /^#/.test(str);

export const Link = ({ href, ...props }) =>
  isHash(href) || isAbsoluteURL(href) ? (
    // eslint-disable-next-line
    <Styled.a
      {...props}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        color: "inherit",
        "&:hover": {
          color: "primary",
        },
        "&.active": {
          color: "primary",
        },
      }}
    />
  ) : (
    <GatsbyLink
      {...props}
      to={href}
      sx={{
        color: "inherit",
        "&:hover": {
          color: "primary",
        },
        "&.active": {
          color: "primary",
        },
      }}
    />
  );

export default Link;
