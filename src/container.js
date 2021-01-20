/** @jsx jsx */
import { jsx } from "theme-ui";

const Container = ({ sx, ...props }) => (
  <div
    {...props}
    sx={{
      ...sx,
      mx: "auto",
      px: [2, 3],
      maxWidth: ["100%", "100%", 680, 960, 1200],
    }}
  />
);

export default Container;
