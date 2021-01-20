/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import { alpha } from "@theme-ui/color";

import Link from "./link";
import { tagRoute } from "./routes";

export default ({ tags, sx, ...props }) => (
  <Styled.ul
    {...props}
    sx={{
      ...sx,
      display: "flex",
      flexWrap: "wrap",
      listStyle: "none",
      p: 0,
    }}
  >
    {tags.map((tag) => (
      <Styled.li
        sx={{
          display: "inline-block",
          mr: 2,
          mb: 2,
          px: 2,
          py: 0,
          bg: "muted",
          cursor: "pointer",
          border: 2,
          borderStyle: "solid",
          borderColor: alpha("text", 0.5),
          borderRadius: 4,
          "&:hover": {
            bg: "primary",
            borderColor: "primary",
            color: "textInverted",
          },
        }}
      >
        <Link
          href={tagRoute(tag)}
          sx={{ textDecoration: "none", fontSize: [0, 1] }}
        >
          {tag}
        </Link>
      </Styled.li>
    ))}
  </Styled.ul>
);
