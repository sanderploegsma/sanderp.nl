/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link as GatsbyLink } from "gatsby";
import isAbsoluteURL from "is-absolute-url";

const isHash = (str) => /^#/.test(str);

export const Link = ({ href, ...props }) =>
  isHash(href) || isAbsoluteURL(href) ? (
    // eslint-disable-next-line
    <a
      {...props}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        color: "inherit",
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
        "&.active": {
          color: "primary",
        },
      }}
    />
  );

export default Link;
